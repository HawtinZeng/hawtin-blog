import { useRef, useState } from "react";
import { Comment } from "../comment/comment";
import { InsertCom, type InsertComProps } from "../insertComment/insertCom";

export function CommentAll() {

  const [replying, setreplying] = useState(false)
  const [width, setwidth] = useState('')
  const [pos, setpos] = useState<any>({left: '', top: ''})
  const lastClickedDom = useRef<any>(null)
  
  function onReply(dom: HTMLElement) {
    

    const bounds = dom.getBoundingClientRect()
    if (lastClickedDom.current === dom || !replying) setreplying(!replying)

    setpos({left: bounds.left + 'px', top: bounds.top + bounds.height + 'px'})
    setwidth(bounds.width + 'px')

    lastClickedDom.current = dom
  }
  
  return <div style={{marginTop: "30px"}}>
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