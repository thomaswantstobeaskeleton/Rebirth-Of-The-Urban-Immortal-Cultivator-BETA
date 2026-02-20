/**
 * Isometric 2.5D map view - Rebirth of the Urban Immortal Cultivator
 * Renders current area + connections as an isometric diamond grid. Click a tile to travel.
 */

(function (global) {
  const TILE_W = 48;
  const TILE_H = 24;
  const ORIGIN_X = 0.5; // fraction of canvas width for center
  const ORIGIN_Y = 0.35;

  function gridToScreen(cx, cy, gx, gy) {
    const isoX = (gx - gy) * (TILE_W / 2);
    const isoY = (gx + gy) * (TILE_H / 2);
    return { x: cx + isoX, y: cy + isoY };
  }

  function layoutNodes(currentId, connectionIds) {
    const nodes = [{ id: currentId, gridX: 0, gridY: 0, isCurrent: true }];
    const count = connectionIds.length;
    const radius = 1.5;
    connectionIds.forEach((id, i) => {
      const angle = (i / Math.max(1, count)) * 2 * Math.PI - Math.PI / 2;
      const gx = Math.round(radius * Math.cos(angle));
      const gy = Math.round(radius * Math.sin(angle));
      nodes.push({ id, gridX: gx, gridY: gy, isCurrent: false });
    });
    return nodes;
  }

  function drawDiamond(ctx, sx, sy, options) {
    const w = TILE_W / 2;
    const h = TILE_H / 2;
    const top = { x: sx, y: sy - h };
    const right = { x: sx + w, y: sy };
    const bottom = { x: sx, y: sy + h };
    const left = { x: sx - w, y: sy };
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(right.x, right.y);
    ctx.lineTo(bottom.x, bottom.y);
    ctx.lineTo(left.x, left.y);
    ctx.closePath();
    if (options.fill) {
      ctx.fillStyle = options.fill;
      ctx.fill();
    }
    if (options.stroke) {
      ctx.strokeStyle = options.stroke;
      ctx.lineWidth = options.lineWidth || 1;
      ctx.stroke();
    }
  }

  function drawConnections(ctx, nodes, nodeById, cx, cy) {
    const current = nodes.find(n => n.isCurrent);
    if (!current) return;
    ctx.strokeStyle = 'rgba(180, 160, 120, 0.5)';
    ctx.lineWidth = 1;
    nodes.forEach(n => {
      if (n.isCurrent) return;
      const p1 = gridToScreen(cx, cy, current.gridX, current.gridY);
      const p2 = gridToScreen(cx, cy, n.gridX, n.gridY);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
  }

  function drawNodes(ctx, nodes, areaNames, currentId, cx, cy, lockedIds) {
    nodes.forEach(n => {
      const sx = gridToScreen(cx, cy, n.gridX, n.gridY);
      const locked = lockedIds && lockedIds.includes(n.id);
      const isCurrent = n.id === currentId;
      drawDiamond(ctx, sx.x, sx.y, {
        fill: isCurrent ? 'rgba(200, 160, 80, 0.5)' : (locked ? 'rgba(40, 40, 35, 0.9)' : 'rgba(50, 50, 45, 0.95)'),
        stroke: isCurrent ? '#c9a227' : (locked ? '#444' : '#6a6355'),
        lineWidth: isCurrent ? 2 : 1
      });
      const name = areaNames[n.id] || n.id;
      const short = name.length > 12 ? name.slice(0, 10) + '…' : name;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = locked ? '#555' : (isCurrent ? '#e8d090' : '#ccc');
      ctx.fillText(short, sx.x, sx.y + 4);
    });
  }

  function drawPlayer(ctx, cx, cy, currentId, sprite) {
    const current = currentId;
    const node = layoutNodes(current, []).find(n => n.isCurrent);
    if (!node) return;
    const s = gridToScreen(cx, cy, node.gridX, node.gridY);
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sprite || '◎', s.x, s.y - 14);
  }

  function getNodeAt(cx, cy, nodes, px, py) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const s = gridToScreen(cx, cy, n.gridX, n.gridY);
      const w = TILE_W / 2;
      const h = TILE_H / 2;
      const dx = Math.abs(px - s.x);
      const dy = Math.abs(py - s.y);
      if (dx / w + dy / h <= 1) return n;
    }
    return null;
  }

  let lastNodes = [];
  let lastCx = 0;
  let lastCy = 0;

  function render(canvas, currentId, connectionIds, areaNames, lockedIds, playerSprite) {
    if (!canvas || !currentId) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const cx = cw * ORIGIN_X;
    const cy = ch * ORIGIN_Y;
    lastCx = cx;
    lastCy = cy;
    ctx.clearRect(0, 0, cw, ch);
    const nodes = layoutNodes(currentId, connectionIds);
    lastNodes = nodes;
    drawConnections(ctx, nodes, {}, cx, cy);
    drawNodes(ctx, nodes, areaNames, currentId, cx, cy, lockedIds);
    drawPlayer(ctx, cx, cy, currentId, playerSprite);
  }

  function getAreaAt(canvas, clientX, clientY) {
    if (!canvas || lastNodes.length === 0) return null;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const n = getNodeAt(lastCx, lastCy, lastNodes, px, py);
    return n ? n.id : null;
  }

  function setupResize(canvas) {
    const container = canvas.parentElement;
    if (!container) return;
    function resize() {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
  }

  global.IsometricView = {
    render,
    getAreaAt,
    layoutNodes,
    getNodeAt: function (cx, cy, nodes, px, py) { return getNodeAt(cx, cy, nodes, px, py); },
    gridToScreen: function (cx, cy, gx, gy) { return gridToScreen(cx, cy, gx, gy); },
    setupResize,
    TILE_W,
    TILE_H,
    ORIGIN_X,
    ORIGIN_Y
  };
})(typeof window !== 'undefined' ? window : this);
