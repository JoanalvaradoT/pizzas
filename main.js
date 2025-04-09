function drawAll() {
    const slices = parseInt(document.getElementById("slices").value);
    drawPizza("canvas1", slices, drawLinePointSlope);
    drawPizza("canvas2", slices, drawLineDDA);
    drawPizza("canvas3", slices, drawLineBresenham);
  }
  
  function drawPizza(canvasId, slices, drawLineAlgorithm) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
  
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  
    for (let i = 0; i < slices; i++) {
      const angle = (2 * Math.PI / slices) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      drawLineAlgorithm(ctx, centerX, centerY, x, y);
    }
  }
  
  function drawLinePointSlope(ctx, x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
  
    if (Math.abs(dx) > Math.abs(dy)) {
      if (x0 > x1) [x0, x1, y0, y1] = [x1, x0, y1, y0];
      let m = dy / dx;
      for (let x = x0; x <= x1; x++) {
        let y = y0 + m * (x - x0);
        ctx.fillRect(x, y, 1, 1);
      }
    } else {
      if (y0 > y1) [x0, x1, y0, y1] = [x1, x0, y1, y0];
      let m_inv = dx / dy;
      for (let y = y0; y <= y1; y++) {
        let x = x0 + m_inv * (y - y0);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  
  function drawLineDDA(ctx, x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    let xInc = dx / steps;
    let yInc = dy / steps;
    let x = x0;
    let y = y0;
    for (let i = 0; i <= steps; i++) {
      ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      x += xInc;
      y += yInc;
    }
  }
  
  function drawLineBresenham(ctx, x0, y0, x1, y1) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
  
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
  
    while (true) {
      ctx.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      let e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }
  