import useLocal from "./useLocal";

export default function useItineraries() {
  const [list, setList] = useLocal("bdtt.itineraries.v1", []);
  const save = (it) =>
    setList((prev) => {
      const i = prev.findIndex((x) => x.id === it.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = it;
        return next;
      }
      return [it, ...prev];
    });
  const patch = (id, p) => setList((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const remove = (id) => setList((prev) => prev.filter((x) => x.id !== id));
  return { list, save, patch, remove };
}
