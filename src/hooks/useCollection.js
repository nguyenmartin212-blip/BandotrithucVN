import useLocal from "./useLocal";

export default function useCollection() {
  const [ids, setIds] = useLocal("bdtt.collection.v2", []);
  const toggle = (id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return { ids, toggle };
}
