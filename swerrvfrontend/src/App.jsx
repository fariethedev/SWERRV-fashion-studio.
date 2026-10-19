import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import './EditorialApp.css';

const LOOKS = [
  { id: 'look-01', number: 1, title: 'Concrete / 01', category: 'Editorial', year: '2026', image: '/images/hero_red_model.png', description: 'A study in contrast, movement, and saturated red.', medium: 'Portrait study', mood: 'Charged', tags: ['contrast', 'movement', 'red'], palette: ['#a84132', '#d6c4b4', '#161616'] },
  { id: 'look-02', number: 2, title: 'After Hours / 02', category: 'Streetwear', year: '2026', image: '/images/_DSC7962 (1).jpg', description: 'Layered silhouettes photographed after dark.', medium: 'Night location', mood: 'Electric', tags: ['layering', 'night', 'utility'], palette: ['#1d2528', '#8b918b', '#d5b28a'] },
  { id: 'look-03', number: 3, title: 'Quiet Form / 03', category: 'Studio', year: '2025', image: '/images/_DSC7953.jpg', description: 'Soft light and a restrained monochrome palette.', medium: 'Studio portrait', mood: 'Still', tags: ['balance', 'soft light', 'form'], palette: ['#ddd8cf', '#9a958e', '#292929'] },
  { id: 'look-04', number: 4, title: 'Signal / 04', category: 'Streetwear', year: '2025', image: '/images/_DSC7934.jpg', description: 'Graphic shapes built for the city.', medium: 'Urban study', mood: 'Graphic', tags: ['geometry', 'city', 'signal'], palette: ['#202020', '#d94e38', '#e5d7c4'] },
  { id: 'look-05', number: 5, title: 'Material Study / 05', category: 'Studio', year: '2024', image: '/images/_DSC7916.jpg', description: 'Texture, fit, and fabric as the subject.', medium: 'Material portrait', mood: 'Tactile', tags: ['texture', 'fabric', 'volume'], palette: ['#716256', '#b9a28c', '#242321'] },
  { id: 'look-06', number: 6, title: 'Open Space / 06', category: 'Editorial', year: '2024', image: '/images/_DSC7893.jpg', description: 'A considered look at volume and motion.', medium: 'Location study', mood: 'Open', tags: ['space', 'volume', 'motion'], palette: ['#b7b4a8', '#6d716c', '#252525'] },
];

const CATEGORIES = ['All', 'Editorial', 'Streetwear', 'Studio'];
const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL?.replace(/\/$/, '');
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured order' },
  { value: 'newest', label: 'Newest first' },
  { value: 'alphabetical', label: 'A–Z' },
];

function Shell({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="editorial-app">
      <header className="editorial-header">
        <Link className="wordmark" to="/" onClick={() => setMenuOpen(false)}>SWERRV<span>®</span></Link>
        <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav className={`editorial-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <Link className={location.pathname === '/' ? 'active' : ''} to="/" onClick={() => setMenuOpen(false)}>Index</Link>
          <Link className={location.pathname === '/lookbook' ? 'active' : ''} to="/lookbook" onClick={() => setMenuOpen(false)}>Lookbook</Link>
          <Link className={location.pathname === '/about' ? 'active' : ''} to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
        <span className="header-note">Independent fashion study / 2026</span>
      </header>
      <main>{children}</main>
      <footer className="editorial-footer"><span>SWERRV / Visual archive</span><span>Read-only catalogue · no accounts · no checkout</span></footer>
    </div>
  );
}

function Index() {
  return <section className="index-page">
    <div className="index-copy"><p className="eyebrow">Independent visual catalogue</p><h1>Clothing as a<br /><em>moving image.</em></h1><p className="lede">SWERRV is a small editorial project exploring silhouettes, texture, and the relationship between clothing and place.</p><Link className="text-link" to="/lookbook">Enter the lookbook <span>↗</span></Link></div>
    <div className="index-hero"><img src="/images/hero_red_model.png" alt="Editorial fashion portrait in a red outfit" /><span className="image-label">Figure 01 / Red study</span></div>
    <div className="index-meta"><span>01—06</span><span>Made for the screen</span><span>Scroll to explore ↓</span></div>
  </section>;
}

function Lookbook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = CATEGORIES.includes(searchParams.get('category')) ? searchParams.get('category') : 'All';
  const initialSort = SORT_OPTIONS.some((option) => option.value === searchParams.get('sort')) ? searchParams.get('sort') : 'featured';
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [looks, setLooks] = useState(LOOKS);
  const [apiState, setApiState] = useState(MOCK_API_URL ? 'loading' : 'local');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!MOCK_API_URL) return undefined;
    const controller = new AbortController();

    fetch(`${MOCK_API_URL}/api/looks`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Mock API request failed');
        return response.json();
      })
      .then((payload) => {
        if (!Array.isArray(payload.data)) throw new Error('Mock API returned invalid catalogue data');
        setLooks(payload.data);
        setApiState('connected');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setApiState('fallback');
      });

    return () => controller.abort();
  }, []);

  const visibleLooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = looks.filter((look) => {
      const matchesCategory = category === 'All' || look.category === category;
      const searchableText = [look.title, look.category, look.mood, look.medium, ...look.tags].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });

    return [...filtered].sort((first, second) => {
      if (sort === 'newest') return Number(second.year) - Number(first.year);
      if (sort === 'alphabetical') return first.title.localeCompare(second.title);
      return first.number - second.number;
    });
  }, [category, looks, query, sort]);

  useEffect(() => {
    const nextParams = {};
    if (category !== 'All') nextParams.category = category;
    if (sort !== 'featured') nextParams.sort = sort;
    if (query.trim()) nextParams.q = query.trim();
    setSearchParams(nextParams, { replace: true });
  }, [category, query, setSearchParams, sort]);

  useEffect(() => {
    if (!selected) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);

  const clearFilters = () => {
    setCategory('All');
    setSort('featured');
    setQuery('');
  };

  return <section className="lookbook-page page-wrap">
    <div className="page-intro"><p className="eyebrow">A fictional sample catalogue</p><h1>Lookbook<span>.</span></h1><p>Browse a set of made-up editorial studies. This catalogue is intentionally read-only: it has no user accounts, checkout, messaging, forms, or external data services.</p></div>
    <div className="catalogue-controls">
      <div className="filter-row" aria-label="Lookbook category filters">{CATEGORIES.map((item) => <button key={item} type="button" className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="control-fields">
        <label className="search-field"><span>Search the archive</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try texture or night" /></label>
        <label className="sort-field"><span>Arrange by</span><select value={sort} onChange={(event) => setSort(event.target.value)}>{SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      </div>
    </div>
    <div className="catalogue-status"><span>{visibleLooks.length} of {looks.length} studies shown · {apiState === 'connected' ? 'Mock API' : apiState === 'fallback' ? 'Static fallback' : 'Local catalogue'}</span>{(category !== 'All' || sort !== 'featured' || query) && <button type="button" onClick={clearFilters}>Clear view ×</button>}</div>
    {visibleLooks.length ? <div className="look-grid">{visibleLooks.map((look) => <button className="look-card" type="button" key={look.id} onClick={() => setSelected(look)}><span className="look-image"><img src={look.image} alt="" /></span><span className="look-card-info"><span><strong>{look.title}</strong><small>{look.mood} / {look.year}</small></span><span>{look.category}</span></span></button>)}</div> : <div className="empty-state"><p className="eyebrow">No matching study</p><p>Try another word or return to the full archive.</p><button type="button" onClick={clearFilters}>Reset filters</button></div>}
    {selected && <div className="look-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><div className="look-modal" role="dialog" aria-modal="true" aria-labelledby="look-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Close preview" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt={`${selected.title} editorial study`} /><div className="look-details"><p className="eyebrow">{selected.category} / {selected.year}</p><h2 id="look-title">{selected.title}</h2><p>{selected.description}</p><dl className="detail-grid"><div><dt>Format</dt><dd>{selected.medium}</dd></div><div><dt>Atmosphere</dt><dd>{selected.mood}</dd></div></dl><div className="tag-list" aria-label="Study tags">{selected.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="palette" aria-label="Study colour palette">{selected.palette.map((colour) => <span key={colour} style={{ backgroundColor: colour }} title={colour} />)}</div></div></div></div>}
  </section>;
}

function About() {
  return <section className="about-page page-wrap"><div className="page-intro"><p className="eyebrow">About the project</p><h1>Human scale<span>.</span></h1></div><div className="about-grid"><p className="about-lead">SWERRV began as a clothing-commerce build and has been deliberately re-scoped into a static visual catalogue for this public review version.</p><div className="about-body"><p>The current app is a frontend-only study: visitors can browse fictional catalogue entries, filter the lookbook, and preview images in memory. Nothing is submitted, persisted, authenticated, purchased, or sent to a third party.</p><p>The project is designed to be easy to inspect and run locally. Its earlier commerce experiments remain visible in Git history as development context; the active branch intentionally removes those workflows from the running experience.</p></div></div><div className="scope-panel"><span>Current scope</span><strong>Read-only visual catalogue</strong><span>No personal data · no payments · no persistence</span></div></section>;
}

function NotFound() { return <section className="not-found page-wrap"><p className="eyebrow">404</p><h1>Nothing here<span>.</span></h1><Link className="text-link" to="/">Return to index <span>↗</span></Link></section>; }

export default function App() { return <BrowserRouter><Shell><Routes><Route path="/" element={<Index />} /><Route path="/lookbook" element={<Lookbook />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></Shell></BrowserRouter>; }
