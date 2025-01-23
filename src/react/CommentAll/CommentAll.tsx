import { useEffect, useRef, useState } from "react";
import { Comment } from "../comment/comment";
import { InsertCom, type InsertComProps } from "../insertComment/insertCom";
import { PhoneWire } from "./PhoneWire";

/*
var url = canvas.toDataURL('image/jpeg');
el.style.background = 'url(' + url + ')';
*/

export function CommentAll() {

  const [replying, setreplying] = useState(false)
  const [width, setwidth] = useState('')
  const [pos, setpos] = useState<any>({left: '', top: ''})
  const lastClickedDom = useRef<any>(null)
  const commentedDom = useRef<any>(null)
  
  function onReply(dom: HTMLElement) {
    commentedDom.current = dom

    const bounds = dom.getBoundingClientRect()
    if (lastClickedDom.current === dom || !replying) {
      setreplying(!replying)
      if (replying) {
        commentedDom.current = null
      }
    }

    setpos({left: bounds.left + 'px', top: bounds.top + bounds.height + 'px'})
    setwidth(bounds.width + 'px')

    lastClickedDom.current = dom
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bounds = containerRef.current?.getBoundingClientRect()
    canvasRef.current!.height = bounds!.height
    canvasRef.current!.width = 120
    const wire = new PhoneWire(canvasRef.current!, {}, {})

    const scrollHandler = (e: MouseEvent) => {
      if (commentedDom.current) {
        const bounds = commentedDom.current.getBoundingClientRect()
        setpos({left: bounds.left + 'px', top: bounds.top + bounds.height + 'px'})
      }
    }
    window.addEventListener('scroll', scrollHandler)
    
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  
  return <div style={{marginTop: "30px", position: "relative"}} ref={containerRef}>
    <canvas ref={canvasRef} style={{ position: "absolute", left: "-80px"}} />
    <span style={{display: "inline-block",fontSize: "16px",fontWeight: "700", marginBottom: "10px"}}>评论：</span>
  <Comment isSub={false} onReply={onReply} />
  <Comment isSub={true} onReply={onReply} />
  <Comment isSub={true}  onReply={onReply} />
  <Comment isSub={true} onReply={onReply} />
  <Comment isSub={true} onReply={onReply} />
  <Comment isSub={true} onReply={onReply} />
  <Comment isSub={true} onReply={onReply} />
  {replying && <InsertCom pos={pos} width={width} />}
  </div>
}