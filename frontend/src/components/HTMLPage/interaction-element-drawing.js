let isMouseDown = false;
let rect;
let onCreateInteractionElement;
let touchIdentifier;
let horizontalOffset;
const posStart = { x: 0, y: 0 };
const posCurrent = { x: 0, y: 0 };

const calculateRectangleCoords = () => (
  {
    x: Math.min(posStart.x, posCurrent.x),
    y: Math.min(posStart.y, posCurrent.y),
    width: Math.abs(posStart.x - posCurrent.x),
    height: Math.abs(posStart.y - posCurrent.y),
  }
);

const createInteractionElement = () => {
  const coords = calculateRectangleCoords();
  coords.x = coords.x - horizontalOffset;

  if (coords.width < 16 || coords.height < 16) return;

  onCreateInteractionElement(coords);
};

const drawRectangle = () => {
  const coords = calculateRectangleCoords();

  rect.style = `
  left:   ${coords.x}px;
  top:    ${coords.y}px;
  width:  ${coords.width}px;
  height:  ${coords.height}px;
  visibility: ${isMouseDown ? 'visible' : 'hidden'}
  `;
}

const setPosStart = event => {
  posStart.x = event.pageX;
  posStart.y = event.pageY;

  posCurrent.x = event.pageX;
  posCurrent.y = event.pageY;

  drawRectangle();
}

const setPosCurrent = event => {
  posCurrent.x = event.pageX;
  posCurrent.y = event.pageY;
  drawRectangle();
}

const handleMouseDown = event => {
  event.preventDefault();
  isMouseDown = true;
  setPosStart(event);
}

const handleMouseMove = event => {
  event.preventDefault();
  if (!isMouseDown) return;
  setPosCurrent(event);
}

const handleMouseUp = event => {
  event.preventDefault();
  isMouseDown = false;
  setPosCurrent(event);
  createInteractionElement();
}

const handleTouchStart = event => {
  event.preventDefault();
  const touch = event.changedTouches[0];
  touchIdentifier = touch.identifier;
  isMouseDown = true;
  setPosStart(touch);
}

const handleTouchMove = event => {
  event.preventDefault();
  if (!event.changedTouches) return;
  const touch = [...event.changedTouches].find(t => t.identifier === touchIdentifier);
  if (!touch) return;
  setPosCurrent(touch);
}

const handleTouchCancel = event => {
  event.preventDefault();
  if (!event.changedTouches) return;
  const touch = [...event.changedTouches].find(t => t.identifier === touchIdentifier);
  if (!touch) return;
  touchIdentifier = null;
  isMouseDown = false;
  setPosStart(touch);
  setPosCurrent(touch);
}

const handleTouchEnd = event => {
  event.preventDefault();
  if (!event.changedTouches) return;
  const touch = [...event.changedTouches].find(t => t.identifier === touchIdentifier);
  if (!touch) return;
  touchIdentifier = null;
  isMouseDown = false;
  setPosCurrent(touch);
  createInteractionElement();
}

export const initInteractionElementDrawing = (container, rectNode, horizOffset, onCreateInteractionElementFunc) => {
  rect = rectNode;
  onCreateInteractionElement = onCreateInteractionElementFunc;
  horizontalOffset = horizOffset;

  container.removeEventListener('mousedown', handleMouseDown);
  container.removeEventListener('mousemove', handleMouseMove);
  container.removeEventListener('mouseup', handleMouseUp);
  container.removeEventListener('touchstart', handleTouchStart);
  container.removeEventListener('touchmove', handleTouchMove);
  container.removeEventListener('touchcancel', handleTouchCancel);
  container.removeEventListener('touchend', handleTouchEnd);

  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseup', handleMouseUp);
  container.addEventListener('touchstart', handleTouchStart, {passive: false});
  container.addEventListener('touchmove', handleTouchMove, {passive: false});
  container.addEventListener('touchcancel', handleTouchCancel, {passive: false});
  container.addEventListener('touchend', handleTouchEnd, {passive: false});
};
