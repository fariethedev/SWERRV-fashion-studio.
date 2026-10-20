export const initialDesign = {
  garment: 'T-shirt',
  colour: '#ded5c4',
  layers: [],
};

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function historyReducer(state, action) {
  if (action.type === 'undo' && state.past.length) {
    return { past: state.past.slice(0, -1), present: state.past.at(-1), future: [state.present, ...state.future] };
  }
  if (action.type === 'redo' && state.future.length) {
    return { past: [...state.past, state.present], present: state.future[0], future: state.future.slice(1) };
  }
  if (action.type === 'edit') {
    const next = action.update(state.present);
    if (JSON.stringify(next) === JSON.stringify(state.present)) return state;
    return { past: [...state.past.slice(-99), state.present], present: next, future: [] };
  }
  return state;
}

export function moveLayer(layers, id, direction) {
  const index = layers.findIndex((layer) => layer.id === id);
  if (index < 0) return layers;
  const side = layers[index].side;
  let target = index + direction;
  while (target >= 0 && target < layers.length && layers[target].side !== side) target += direction;
  if (target < 0 || target >= layers.length) return layers;
  const next = [...layers];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
