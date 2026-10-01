import { useState, useEffect } from "react";

export default function useCollection() {
    const [ids, setIds] = useState(() => {
        try { return JSON.parse(localStorage.getItem("collection")) || []; } catch { return []; }
    });
    useEffect(() => { localStorage.setItem("collection", JSON.stringify(ids)); }, [ids]);
    const toggle = (id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    return { ids, toggle };
}