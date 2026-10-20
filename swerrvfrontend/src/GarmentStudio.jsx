import { useReducer, useRef, useState } from 'react';
import { clamp, historyReducer, initialDesign, moveLayer } from './studio-state';
import './GarmentStudio.css';

const TEMPLATES = {
  'T-shirt': 'M170 100 L115 115 L60 205 L123 240 L150 200 L150 490 L350 490 L350 200 L377 240 L440 205 L385 115 L330 100 Q250 150 170 100 Z',
  Hoodie: 'M175 105 L115 130 L50 390 L115 410 L150 235 L150 490 L350 490 L350 235 L385 410 L450 390 L385 130 L325 105 Q250 155 175 105 Z',
  Sweatshirt: 'M175 100 L115 125 L50 390 L115 410 L150 220 L150 490 L350 490 L350 220 L385 410 L450 390 L385 125 L325 100 Q250 145 175 100 Z',
};

function Artwork({ layer }) {
  if (layer.kind === 'text') return <text textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="800" fontFamily="Arial, sans-serif">{layer.text}</text>;
  if (layer.kind === 'circle') return <circle r="38" />;
  if (layer.kind === 'rectangle') return <rect x="-45" y="-28" width="90" height="56" rx="3" />;
  if (layer.kind === 'bolt') return <path d="M5 -50 L-35 8 L-3 8 L-12 50 L38 -12 L7 -12 Z" />;
  return <path d="M0 -46 L11 -14 L45 -14 L18 6 L28 40 L0 20 L-28 40 L-18 6 L-45 -14 L-11 -14 Z" />;
}

export default function GarmentStudio() {
  const [history, dispatch] = useReducer(historyReducer, { past: [], present: initialDesign, future: [] });
  const design = history.present;
  const [side, setSide] = useState('front');
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState('');
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const selected = design.layers.find((layer) => layer.id === selectedId && layer.side === side);
  const visible = design.layers.filter((layer) => layer.side === side);
  const edit = (update) => dispatch({ type: 'edit', update });
  const updateLayer = (changes) => edit((current) => ({
    ...current, layers: current.layers.map((layer) => layer.id === selectedId ? { ...layer, ...changes } : layer),
  }));
  const addLayer = (kind) => {
    if (design.layers.length >= 40) { setNotice('Maximum 40 layers per design. Remove a layer to add another.'); return; }
    const id = crypto.randomUUID();
    edit((current) => ({ ...current, layers: [...current.layers, {
      id, side, kind, text: 'SWERRV', colour: '#db4d32', x: 250, y: 290, scale: 1, rotation: 0,
    }] }));
    setSelectedId(id);
    setNotice('');
  };
  const point = (event) => {
    const matrix = svgRef.current.getScreenCTM();
    return matrix ? new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse()) : null;
  };
  const startDrag = (event, layer) => {
    if (event.button !== 0) return;
    const position = point(event);
    if (!position) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(layer.id);
    dragRef.current = { layer, position };
  };
  const drag = (event) => {
    const current = dragRef.current;
    const position = point(event);
    if (!current || !position) return;
    setDraft({ ...current.layer,
      x: clamp(current.layer.x + position.x - current.position.x, 165, 335),
      y: clamp(current.layer.y + position.y - current.position.y, 190, 435),
    });
  };
  const endDrag = () => {
    if (draft) edit((current) => ({ ...current, layers: current.layers.map((layer) => layer.id === draft.id ? draft : layer) }));
    dragRef.current = null;
    setDraft(null);
  };
  const download = () => {
    const svg = svgRef.current.cloneNode(true);
    svg.querySelectorAll('[data-editor]').forEach((node) => node.remove());
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `swerrv-${design.garment.toLowerCase()}-${side}.svg`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(`Exported ${side} SVG mockup. This is a visual preview, not a production print specification.`);
  };

  return <section className="studio page-wrap">
    <div className="page-intro"><p className="eyebrow">Design workspace</p><h1>Garment studio<span>.</span></h1><p>Build a concept with original vector templates and built-in artwork. Your design stays in memory until you export it; refreshing clears it.</p></div>
    <div className="studio-toolbar">
      <button disabled={!history.past.length} onClick={() => dispatch({ type: 'undo' })}>Undo</button>
      <button disabled={!history.future.length} onClick={() => dispatch({ type: 'redo' })}>Redo</button>
      <button onClick={download}>Export {side} SVG</button>
      <span role="status">{notice}</span>
    </div>
    <div className="studio-layout">
      <aside className="studio-panel" aria-label="Garment and artwork controls">
        <h2>01 / Garment</h2>
        <label>Template<select value={design.garment} onChange={(event) => edit((current) => ({ ...current, garment: event.target.value }))}>{Object.keys(TEMPLATES).map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Fabric colour<input type="color" value={design.colour} onChange={(event) => edit((current) => ({ ...current, colour: event.target.value }))} /></label>
        <div className="studio-buttons" role="group" aria-label="Garment side">{['front', 'back'].map((value) => <button key={value} aria-pressed={side === value} onClick={() => { setSide(value); setSelectedId(null); }}>{value}</button>)}</div>
        <h2>02 / Add artwork</h2>
        <div className="studio-buttons">{['text', 'circle', 'rectangle', 'star', 'bolt'].map((kind) => <button key={kind} onClick={() => addLayer(kind)}>+ {kind}</button>)}</div>
        <p>Drag artwork or use the position controls. Artwork is clipped to the dashed print area. Front and back have separate layers.</p>
        <h2>03 / Layers</h2>
        {!visible.length && <p>Add artwork to begin.</p>}
        <ol className="studio-layers">{[...visible].reverse().map((layer) => <li key={layer.id}><button aria-pressed={selectedId === layer.id} onClick={() => setSelectedId(layer.id)}>{layer.kind === 'text' ? layer.text || '(empty text)' : layer.kind}</button></li>)}</ol>
      </aside>
      <div className="studio-preview">
        <svg ref={svgRef} viewBox="0 0 500 560" width="500" height="560" role="img" aria-label={`${design.colour} ${design.garment}, ${side} mockup`}>
          <title>SWERRV {design.garment} — {side}</title>
          <defs><clipPath id="studio-print-area"><rect x="165" y="190" width="170" height="245" /></clipPath></defs>
          <path d={TEMPLATES[design.garment]} fill={design.colour} stroke="#444" strokeWidth="2" />
          {design.garment === 'Hoodie' ? <path d={side === 'front' ? 'M175 105 Q170 20 250 30 Q330 20 325 105 L250 160 Z' : 'M175 105 Q170 20 250 30 Q330 20 325 105 Q250 200 175 105 Z'} fill={design.colour} stroke="#444" strokeWidth="2" /> : <path d={side === 'front' ? 'M175 103 Q250 175 325 103' : 'M175 103 Q250 130 325 103'} fill="none" stroke="#555" strokeWidth="3" />}
          <path d="M155 478 H345" stroke="#777" fill="none" />
          <g clipPath="url(#studio-print-area)">{visible.map((original) => {
            const layer = draft?.id === original.id ? draft : original;
            return <g key={layer.id} transform={`translate(${layer.x} ${layer.y}) rotate(${layer.rotation}) scale(${layer.scale})`} fill={layer.colour} style={{ cursor: 'move', touchAction: 'none' }} onPointerDown={(event) => startDrag(event, layer)} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={() => { dragRef.current = null; setDraft(null); }}>
              <Artwork layer={layer} />
              {selectedId === layer.id && <rect data-editor="" x="-52" y="-52" width="104" height="104" fill="none" stroke="#1673db" strokeDasharray="4 4" strokeWidth="1" pointerEvents="none" />}
            </g>;
          })}</g>
          <rect data-editor="" x="165" y="190" width="170" height="245" fill="none" stroke="#777" strokeDasharray="5 5" pointerEvents="none" />
        </svg>
        <p>{side} view · illustrative 2D mockup · no physical print dimensions</p>
      </div>
      <aside className="studio-panel" aria-label="Selected artwork">
        <h2>04 / Artwork settings</h2>
        {!selected ? <p>Select a layer to adjust its appearance and position.</p> : <>
          {selected.kind === 'text' && <label>Text (40 characters)<input maxLength={40} value={selected.text} onChange={(event) => updateLayer({ text: event.target.value })} /></label>}
          <label>Ink colour<input type="color" value={selected.colour} onChange={(event) => updateLayer({ colour: event.target.value })} /></label>
          {[['x', 'Horizontal position', 165, 335, 1], ['y', 'Vertical position', 190, 435, 1], ['scale', 'Size', 0.25, 2, 0.05], ['rotation', 'Rotation', -180, 180, 1]].map(([key, label, min, max, step]) => <label key={key}>{label}: {selected[key]}<input type="range" min={min} max={max} step={step} value={selected[key]} onChange={(event) => updateLayer({ [key]: Number(event.target.value) })} /></label>)}
          <div className="studio-buttons">
            <button onClick={() => edit((current) => ({ ...current, layers: moveLayer(current.layers, selectedId, 1) }))}>Bring forward</button>
            <button onClick={() => edit((current) => ({ ...current, layers: moveLayer(current.layers, selectedId, -1) }))}>Send backward</button>
            <button onClick={() => edit((current) => ({ ...current, layers: current.layers.filter((layer) => layer.id !== selectedId) }))}>Delete layer</button>
          </div>
        </>}
      </aside>
    </div>
  </section>;
}
