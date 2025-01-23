import type { Position } from "../types/geometry";

export class PhoneWire {
  // relations: { a: [b, c, d, e, f, g], d: [g, h, q], b: [o, p] }
  // id2Position: { a: {x: 12, y: 80}, b: {x: 90, y: 120} }
  constructor(public cvs: HTMLCanvasElement, public id2Position: Object, public relations: Object){
    this.drawSemiRect({x: 70, y: 20}, {x: 110, y: 80})
  }

  drawSemiRect(start: Position, end: Position) {
    const context = this.cvs.getContext('2d')
    if (!context) return

    context.save()
    
    context.beginPath();
    context.moveTo(start.x, start.y)
    context.lineTo(start.x - 50, start.y)
    context.lineTo(start.x - 50, end.y)
    context.lineTo(end.x, end.y)

    context.lineWidth = 2;
    context.strokeStyle = "yellow"

    context.stroke()
    context.restore()
    
    context.beginPath();
    context.arc(start.x, start.y, 6, Math.PI / 2, Math.PI / 2 * 3, false);
    context.fill();

    context.beginPath();
    context.arc(end.x, end.y, 6, Math.PI / 2, Math.PI / 2 * 3, false);
    context.fill();
  }
}