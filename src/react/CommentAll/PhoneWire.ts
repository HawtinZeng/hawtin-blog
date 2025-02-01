import type { Position } from "../types/geometry";
import * as am5 from "@amcharts/amcharts5";

export class PhoneWire {
  static colorSet: am5.ColorSet

  xPosition = new Map<string, number>();
  
  constructor(public cvs: HTMLCanvasElement, public id2Position: Map<string, Position>, public relations: Map<string, string>, public includedRoot: Map<string, string>){
    relations.keys().forEach(k => {
      this.drawSemiRect(id2Position.get(k)!, id2Position.get(relations.get(k)!)!, k)
    })
  }

  drawSemiRect(start: Position, end: Position, fromId: string) {

    const rootId = this.includedRoot.get(fromId)!
    let xPosition = start.x - 80
    
    if (this.xPosition.has(rootId)) {
      xPosition = this.xPosition.get(rootId)! + 5
    }
    this.xPosition.set(rootId, xPosition)

    const context = this.cvs.getContext('2d')
    if (!context) return

    context.save()
    
    context.beginPath();

    context.moveTo(start.x, start.y)
    
    context.arcTo( xPosition, start.y,  xPosition, end.y, 20);
    context.arcTo( xPosition, end.y, end.x, end.y, 20);
    
    context.lineTo(end.x, end.y)

    context.lineWidth = 1;
    context.strokeStyle = PhoneWire.colorSet.next().toCSS()

    context.stroke()
    context.restore()

    context.beginPath();
    context.fillStyle = "#1976d2"
    context.arc(start.x, start.y, 6, Math.PI / 2, Math.PI / 2 * 3, false);
    context.fill();

    context.beginPath();
    context.arc(end.x, end.y, 6, Math.PI / 2, Math.PI / 2 * 3, false);
    context.fill();

    context.restore()
  }
}