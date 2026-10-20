import { test } from 'node:test';
import assert from 'node:assert/strict';
import { historyReducer, initialDesign, moveLayer, clamp } from '../src/studio-state.js';

test('undo and redo restore edits; branching clears redo', () => {
  const initial = { past: [], present: initialDesign, future: [] };
  const edited = historyReducer(initial, { type: 'edit', update: (design) => ({ ...design, colour: '#ffffff' }) });
  const undone = historyReducer(edited, { type: 'undo' });
  assert.deepEqual(undone.present, initialDesign);
  assert.deepEqual(historyReducer(undone, { type: 'redo' }).present, edited.present);
  const branched = historyReducer(undone, { type: 'edit', update: (design) => ({ ...design, garment: 'Hoodie' }) });
  assert.equal(branched.future.length, 0);
  assert.equal(initialDesign.colour, '#ded5c4');
});

test('ordering skips opposite-side layers without mutating inputs', () => {
  const layers = [{ id: 'a', side: 'front' }, { id: 'b', side: 'back' }, { id: 'c', side: 'front' }];
  assert.deepEqual(moveLayer(layers, 'a', 1).map((layer) => layer.id), ['c', 'b', 'a']);
  assert.deepEqual(layers.map((layer) => layer.id), ['a', 'b', 'c']);
  assert.equal(moveLayer(layers, 'b', 1), layers);
  assert.equal(moveLayer(layers, 'missing', 1), layers);
});

test('history stays bounded and placement stays inside the print region', () => {
  let state = { past: [], present: initialDesign, future: [] };
  for (let index = 0; index < 120; index++) state = historyReducer(state, { type: 'edit', update: (design) => ({ ...design, colour: String(index) }) });
  assert.equal(state.past.length, 100);
  assert.equal(clamp(-500, 165, 335), 165);
  assert.equal(clamp(900, 190, 435), 435);
});
