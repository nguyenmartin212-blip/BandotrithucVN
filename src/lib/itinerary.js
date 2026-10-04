// Logic gợi ý và sắp xếp lịch trình (thuần JS, không phụ thuộc React).
export const SLOT_RANK = { morning: 0, afternoon: 1, evening: 2 };
export const DAY_CAPACITY = 8; // số giờ hoạt động hợp lý mỗi ngày (nhóm nhỏ)
export const MAX_PEOPLE = 30;

// Nhóm càng đông thì di chuyển, gọi món, xếp hàng càng lâu nên mỗi ngày nên đi ít hơn.
export function dayCapacity(people = 2) {
  if (people >= 10) return 6.5;
  if (people >= 6) return 7;
  return DAY_CAPACITY;
}

export function placeMap(dest) {
  const m = {};
  (dest?.places || []).forEach((p) => (m[p.id] = p));
  return m;
}

export function totalHours(ids, map) {
  return ids.reduce((s, id) => s + (map[id]?.hours || 0), 0);
}

function sortWithin(ids, map) {
  return [...ids].sort((a, b) => {
    const pa = map[a], pb = map[b];
    return SLOT_RANK[pa.slot] - SLOT_RANK[pb.slot] || pa.zone - pb.zone;
  });
}

// Chọn sẵn các địa điểm "nên đi" vừa với số ngày, ưu tiên nhóm sở thích người dùng chọn.
// interests rỗng = gợi ý cân bằng như trước. Nếu sở thích không có địa điểm nào thì quay về cân bằng.
export function recommendedIds(dest, days, interests = [], people = 2) {
  const cap = days * dayCapacity(people);
  const want = interests.length ? dest.places.filter((p) => interests.includes(p.kind)) : [];
  if (want.length === 0) return balancedIds(dest, cap);

  const chosen = [];
  let sum = 0;
  const add = (p, limit) => {
    if (!chosen.includes(p.id) && sum + p.hours <= limit) { chosen.push(p.id); sum += p.hours; }
  };
  // 1) điểm hợp sở thích, điểm "nên đi" trước
  [...want].sort((a, b) => Number(b.must) - Number(a.must)).forEach((p) => add(p, cap * 0.9));
  // 2) nếu còn trống nhiều thì thêm vài điểm nổi bật khác để chuyến đi không quá lệch
  for (const p of dest.places) {
    if (sum >= cap * 0.6) break;
    if (p.must) add(p, cap * 0.9);
  }
  return chosen;
}

function balancedIds(dest, cap) {
  const chosen = [];
  let sum = 0;
  for (const p of dest.places) {
    if (p.must && sum + p.hours <= cap * 0.9) { chosen.push(p.id); sum += p.hours; }
  }
  for (const p of dest.places) {
    if (sum >= cap * 0.6) break;
    if (!chosen.includes(p.id) && sum + p.hours <= cap * 0.9) { chosen.push(p.id); sum += p.hours; }
  }
  return chosen;
}

// Chia các địa điểm đã chọn thành `days` ngày: gom theo khu vực và cân bằng số giờ.
export function autoPlan(dest, ids, days) {
  const map = placeMap(dest);
  const items = ids.map((id) => map[id]).filter(Boolean)
    .sort((a, b) => a.zone - b.zone || SLOT_RANK[a.slot] - SLOT_RANK[b.slot]);
  const total = items.reduce((s, p) => s + p.hours, 0);
  const target = total / Math.max(days, 1);
  const plan = Array.from({ length: days }, () => []);
  let d = 0, load = 0;
  for (const p of items) {
    if (d < days - 1 && load > 0 && load + p.hours > target * 1.25) { d++; load = 0; }
    plan[d].push(p.id);
    load += p.hours;
  }
  return plan.map((day) => sortWithin(day, map));
}

export function fmtTime(min) {
  const h = Math.floor(min / 60) % 24;
  const m = Math.round(min % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Tính giờ bắt đầu/kết thúc gợi ý cho một ngày (theo thứ tự người dùng đang sắp).
export function scheduleDay(ids, map) {
  let t = 8 * 60;
  const out = [];
  for (const id of ids) {
    const p = map[id];
    if (!p) continue;
    let start = t;
    if (p.slot === "afternoon") start = Math.max(start, 13 * 60 + 30);
    if (p.slot === "evening") start = Math.max(start, 18 * 60 + 30);
    if (p.kind !== "food" && start >= 11 * 60 + 30 && start < 13 * 60) start = 13 * 60;
    const end = start + Math.round(p.hours * 60);
    out.push({ id, start, end });
    t = end + 30;
  }
  return out;
}

export function monthScore(dest, m) {
  return dest.bestMonths[m - 1] || 2;
}

export function bestMonth(dest) {
  let best = 1, score = -1;
  dest.bestMonths.forEach((s, i) => { if (s > score) { score = s; best = i + 1; } });
  return best;
}

export function newId() {
  return "it-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function moveItem(plan, fromDay, id, toDay, map) {
  if (fromDay === toDay) return plan;
  const next = plan.map((d) => d.filter((x) => x !== id));
  next[toDay] = sortWithin([...next[toDay], id], map);
  return next;
}

export function shift(plan, day, idx, dir) {
  const next = plan.map((d) => [...d]);
  const j = idx + dir;
  if (j < 0 || j >= next[day].length) return plan;
  [next[day][idx], next[day][j]] = [next[day][j], next[day][idx]];
  return next;
}

export function removeItem(plan, id) {
  return plan.map((d) => d.filter((x) => x !== id));
}

// Đổi số ngày của một kế hoạch có sẵn (giữ nguyên các địa điểm đã chọn).
export function resizePlan(dest, plan, days) {
  const ids = plan.flat();
  return autoPlan(dest, ids, days);
}
