import { useEffect, useState } from "react";

// useState có lưu vào localStorage (có try/catch để không lỗi khi bị chặn lưu trữ).
export default function useLocal(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* bỏ qua */
    }
  }, [key, value]);
  return [value, setValue];
}
