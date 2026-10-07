const SUPPORTED_CURRENCIES = ["VND", "USD", "JPY", "KRW"];

const FALLBACK_USD_RATES = {
  USD: 1,
  VND: 26300,
  JPY: 150,
  KRW: 1400,
};

const CACHE_PREFIX = "travel-knowledge-fx:";
const CACHE_TTL = 30 * 60 * 1000;

function safeReadCache(base) {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${base}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.rates || !parsed?.savedAt) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWriteCache(base, value) {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${base}`, JSON.stringify(value));
  } catch {
    // localStorage can be unavailable in private/embedded browsing. Ignore safely.
  }
}

function buildFallback(base) {
  const baseInUsd = FALLBACK_USD_RATES[base];
  const rates = {};

  SUPPORTED_CURRENCIES.forEach((code) => {
    rates[code] = FALLBACK_USD_RATES[code] / baseInUsd;
  });

  return {
    base,
    rates,
    source: "fallback",
    updatedAt: null,
  };
}

export async function getCurrencyRates(base) {
  if (!SUPPORTED_CURRENCIES.includes(base)) {
    throw new Error(`Unsupported currency: ${base}`);
  }

  const cached = safeReadCache(base);
  if (cached) return { ...cached, source: "cache" };

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!response.ok) throw new Error("Exchange-rate request failed");

    const data = await response.json();
    if (data?.result !== "success" || !data?.rates) {
      throw new Error("Invalid exchange-rate response");
    }

    const rates = {};
    SUPPORTED_CURRENCIES.forEach((code) => {
      if (typeof data.rates[code] === "number") rates[code] = data.rates[code];
    });

    if (Object.keys(rates).length !== SUPPORTED_CURRENCIES.length) {
      throw new Error("Missing supported exchange rates");
    }

    const payload = {
      base,
      rates,
      updatedAt: data.time_last_update_utc ?? null,
      savedAt: Date.now(),
    };

    safeWriteCache(base, payload);
    return { ...payload, source: "live" };
  } catch {
    return buildFallback(base);
  }
}

export function convertCurrency(amount, rate) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0 || !Number.isFinite(rate)) return 0;
  return value * rate;
}

export function formatCurrencyAmount(value, currency) {
  const maximumFractionDigits = currency === "VND" || currency === "JPY" || currency === "KRW" ? 0 : 2;
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits,
  }).format(value);
}

export { SUPPORTED_CURRENCIES };
