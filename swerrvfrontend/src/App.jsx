import { useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import './EditorialApp.css';

const LOOKS = [
  { id: 'look-01', title: 'Concrete / 01', category: 'Editorial', image: '/images/hero_red_model.png', description: 'A study in contrast, movement, and saturated red.' },
  { id: 'look-02', title: 'After Hours / 02', category: 'Streetwear', image: '/images/_DSC7962 (1).jpg', description: 'Layered silhouettes photographed after dark.' },
  { id: 'look-03', title: 'Quiet Form / 03', category: 'Studio', image: '/images/_DSC7953.jpg', description: 'Soft light and a restrained monochrome palette.' },
  { id: 'look-04', title: 'Signal / 04', category: 'Streetwear', image: '/images/_DSC7934.jpg', description: 'Graphic shapes built for the city.' },
  { id: 'look-05', title: 'Material Study / 05', category: 'Studio', image: '/images/_DSC7916.jpg', description: 'Texture, fit, and fabric as the subject.' },
  { id: 'look-06', title: 'Open Space / 06', category: 'Editorial', image: '/images/_DSC7893.jpg', description: 'A considered look at volume and motion.' },
];

const CATEGORIES = ['All', 'Editorial', 'Streetwear', 'Studio'];

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
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const visibleLooks = useMemo(() => category === 'All' ? LOOKS : LOOKS.filter((look) => look.category === category), [category]);

  return <section className="lookbook-page page-wrap">
    <div className="page-intro"><p className="eyebrow">A fictional sample catalogue</p><h1>Lookbook<span>.</span></h1><p>Browse a set of made-up editorial studies. This catalogue is intentionally read-only: it has no user accounts, checkout, messaging, forms, or external data services.</p></div>
    <div className="filter-row" aria-label="Lookbook filters">{CATEGORIES.map((item) => <button key={item} type="button" className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="look-grid">{visibleLooks.map((look) => <button className="look-card" type="button" key={look.id} onClick={() => setSelected(look)}><span className="look-image"><img src={look.image} alt="" /></span><span className="look-card-info"><span>{look.title}</span><span>{look.category}</span></span></button>)}</div>
    {selected && <div className="look-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><div className="look-modal" role="dialog" aria-modal="true" aria-labelledby="look-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Close preview" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt="" /><div><p className="eyebrow">{selected.category}</p><h2 id="look-title">{selected.title}</h2><p>{selected.description}</p></div></div></div>}
  </section>;
}

function About() {
  return <section className="about-page page-wrap"><div className="page-intro"><p className="eyebrow">About the project</p><h1>Human scale<span>.</span></h1></div><div className="about-grid"><p className="about-lead">SWERRV began as a clothing-commerce build and has been deliberately re-scoped into a static visual catalogue for this public review version.</p><div className="about-body"><p>The current app is a frontend-only study: visitors can browse fictional catalogue entries, filter the lookbook, and preview images in memory. Nothing is submitted, persisted, authenticated, purchased, or sent to a third party.</p><p>The project is designed to be easy to inspect and run locally. Its earlier commerce experiments remain visible in Git history as development context; the active branch intentionally removes those workflows from the running experience.</p></div></div><div className="scope-panel"><span>Current scope</span><strong>Read-only visual catalogue</strong><span>No personal data · no payments · no persistence</span></div></section>;
}

function NotFound() { return <section className="not-found page-wrap"><p className="eyebrow">404</p><h1>Nothing here<span>.</span></h1><Link className="text-link" to="/">Return to index <span>↗</span></Link></section>; }

export default function App() { return <BrowserRouter><Shell><Routes><Route path="/" element={<Index />} /><Route path="/lookbook" element={<Lookbook />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></Shell></BrowserRouter>; }
