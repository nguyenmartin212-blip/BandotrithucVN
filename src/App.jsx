import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import DetailPanel from "./components/DetailPanel";
import ItineraryBuilder from "./components/ItineraryBuilder";
import SavedItineraries from "./components/SavedItineraries";
import LandingPage from "./components/LandingPage";
import GlobeExplorer from "./components/GlobeExplorer";
import TravelTransition from "./components/TravelTransition";
import StoryPlayer from "./components/StoryPlayer";
import useCollection from "./hooks/useCollection";
import useItineraries from "./hooks/useItineraries";
import useLocal from "./hooks/useLocal";
import { DESTINATIONS } from "./data/content";
import { LANGS, tr } from "./i18n";
import "./index.css";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [travelCountry, setTravelCountry] = useState({ id: "vn", name: "Việt Nam" });
  const [lang, setLang] = useLocal("bdtt.lang", "vi");
  const [geo, setGeo] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [panel, setPanel] = useState({ view: "layers" });
  const [query, setQuery] = useState("");
  const [sat, setSat] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [builder, setBuilder] = useState(null); // null | { destId?, itinerary? }
  const [showSaved, setShowSaved] = useState(false);
  const [story, setStory] = useState(null); // null | { destId }
  const col = useCollection();
  const trips = useItineraries();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    fetch("/data/vietnam.geojson")
      .then((r) => r.json())
      .then(setGeo)
      .catch(() => setGeo(null));
  }, []);

  const list = onlySaved ? DESTINATIONS.filter((d) => col.ids.includes(d.id)) : DESTINATIONS;
  const selected = DESTINATIONS.find((d) => d.id === selectedId) || null;

  const select = (id) => {
    setSelectedId(id);
    setPanel({ view: "layers" });
  };
  const openEntry = (destId, entry) => {
    setSelectedId(destId);
    setPanel({ view: "layer", layerId: entry.layer, highlight: entry.id });
  };
  const openBuilder = (destId) => {
    setShowSaved(false);
    setStory(null);
    setBuilder({ destId });
  };
  const openStory = (destId) => {
    setShowSaved(false);
    setBuilder(null);
    select(destId);
    setStory({ destId });
  };
  const randomStory = () => {
    const pool = DESTINATIONS.filter((d) => d.id !== selectedId);
    openStory(pool[Math.floor(Math.random() * pool.length)].id);
  };

  if (screen === "landing") return <LandingPage onStart={() => setScreen("globe")} />;
  if (screen === "globe") return (
    <GlobeExplorer
      onBack={() => setScreen("landing")}
      onExplore={(country) => { setTravelCountry(country); setScreen("transition"); }}
    />
  );
  if (screen === "transition") return <TravelTransition countryName={travelCountry.name} onComplete={() => setScreen("explore")} />;

  return (
    <div className="app">
      <header className="top">
        <button className="logo logo--button" onClick={() => setScreen("landing")} title="Về trang giới thiệu">
          <b>V</b>
          <div>VIỆT NAM<small>TRAVEL KNOWLEDGE</small></div>
        </button>
        <nav className="nav">
          <button className="on">{tr(lang, "nav_explore")}</button>
          <button onClick={() => openBuilder()}>{tr(lang, "nav_plan")}</button>
          <button onClick={() => { setBuilder(null); setShowSaved(true); }}>
            {tr(lang, "nav_mine")}{trips.list.length ? ` (${trips.list.length})` : ""}
          </button>
        </nav>
        <div className="right">
          <select className="lang" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="language">
            {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
          <button className="link" onClick={() => setOnlySaved(!onlySaved)} title={tr(lang, "only_saved")}>
            {onlySaved ? "♥" : "♡"} {tr(lang, "collection")} ({col.ids.length})
          </button>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{tr(lang, "hero_eyebrow")}</p>
          <h1>
            {tr(lang, "hero_a")} <em>{tr(lang, "hero_a_em")}</em>{" "}
            {tr(lang, "hero_b")} <em>{tr(lang, "hero_b_em")}</em>
          </h1>
        </div>
        <p className="hero__sub">{tr(lang, "hero_sub")}</p>
      </section>

      <div className="grid">
        <Sidebar
          lang={lang}
          all={DESTINATIONS}
          list={list}
          selectedId={selectedId}
          onSelect={select}
          onOpenEntry={openEntry}
          query={query}
          setQuery={setQuery}
          onPlan={() => openBuilder()}
          onMine={() => setShowSaved(true)}
          savedCount={trips.list.length}
        />

        <main className={`map-area ${sat ? "sat" : ""}`}>
          <div className="seg">
            <button className={!sat ? "on" : ""} onClick={() => setSat(false)}>{tr(lang, "map_mode_map")}</button>
            <button className={sat ? "on" : ""} onClick={() => setSat(true)}>{tr(lang, "map_mode_sat")}</button>
          </div>
          <MapView geo={geo} destinations={list} selected={selected} onSelect={select} sat={sat} lang={lang} />
          <div className="map-credit">{tr(lang, "map_credit")}{sat ? " · Imagery © Esri" : ""}</div>
        </main>

        {selected ? (
          <DetailPanel
            key={selected.id}
            dest={selected}
            lang={lang}
            panel={panel}
            setPanel={setPanel}
            saved={col.ids.includes(selected.id)}
            onSave={() => col.toggle(selected.id)}
            onClose={() => setSelectedId(null)}
            onPlan={openBuilder}
            onStory={openStory}
          />
        ) : (
          <aside className="panel panel--empty">
            <div className="empty-state">
              <div className="empty-state__ic">⌖</div>
              <h3>{tr(lang, "panel_empty_title")}</h3>
              <p>{tr(lang, "panel_empty_text")}</p>
              <button className="btn btn--accent story-cta" onClick={randomStory}>
                ✦ {tr(lang, "story_random")}
                <small>{tr(lang, "story_random_hint")}</small>
              </button>
            </div>
          </aside>
        )}
      </div>

      {story && DESTINATIONS.find((d) => d.id === story.destId) && (
        <StoryPlayer
          key={story.destId}
          dest={DESTINATIONS.find((d) => d.id === story.destId)}
          lang={lang}
          setLang={setLang}
          onClose={() => setStory(null)}
          onPlan={openBuilder}
          onLayers={() => setStory(null)}
        />
      )}

      {builder && (
        <ItineraryBuilder
          key={builder.itinerary?.id || builder.itinerary?.name || builder.destId || "new"}
          lang={lang}
          dests={DESTINATIONS}
          initial={builder}
          onClose={() => setBuilder(null)}
          onSave={trips.save}
          onOpenSaved={() => { setBuilder(null); setShowSaved(true); }}
        />
      )}

      {showSaved && (
        <SavedItineraries
          lang={lang}
          list={trips.list}
          onClose={() => setShowSaved(false)}
          onPatch={trips.patch}
          onRemove={trips.remove}
          onNew={() => openBuilder()}
          onEdit={(it) => { setShowSaved(false); setBuilder({ itinerary: it }); }}
          onCopy={(it) => {
            setShowSaved(false);
            setBuilder({ itinerary: { ...it, id: null, name: `${it.name} ${tr(lang, "sv_copy_suffix")}`, createdAt: null, rating: 0 } });
          }}
        />
      )}
    </div>
  );
}
