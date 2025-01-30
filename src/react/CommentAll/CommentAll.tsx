import { useEffect, useRef, useState } from "react";
import { Comment, type CommentProps } from "../comment/comment";
import { InsertCom } from "../insertComment/insertCom";
import { PhoneWire } from "./PhoneWire";
import { Button } from "@mui/material";

export function CommentAll() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const userInfo = useRef<any>('')
  const [allComData, setallComData] = useState<CommentProps[]>([])

  useEffect(() => {
    const bounds = containerRef.current?.getBoundingClientRect()
    canvasRef.current!.height = bounds!.height

    const userInf = fetch('/api/user', {
			method: 'POST',
			headers: {
				Accept: "application/json",
    }})

    userInfo.current = userInf

    canvasRef.current!.width = 120
    const wire = new PhoneWire(canvasRef.current!, {}, {})

    refreshComments()
    
    return () => {
    }
  }, [])  
  
  const [isReplying, setisReplying] = useState('')
  function reply() {
    if (isReplying !== '') {
      setisReplying('')
    } else {
      setisReplying('blog')
    }
  }

  function noReply() {
    setisReplying('')
  }

  async function refreshComments() {
    const commentsJson = await fetch('/api/comment', {method: "GET"})
    const comments = await  commentsJson.json()
    setallComData(comments)
  }

  const paths = window.location.pathname.split('/');
  const to = {id: 'blog-' + paths[paths.length - 1], name: ''}
  
  return <div style={{marginTop: "30px", position: "relative"}} ref={containerRef}>
    <canvas ref={canvasRef} style={{ position: "absolute", left: "-80px"}} />
    <div style={{padding: "10px 0"}}>
      <span style={{display: "inline-block",fontSize: "16px",fontWeight: "700", marginBottom: "10px"}}>评论：</span>
      <Button variant="text" style={{float: "right"}} onClick={reply}>
        添加评论
      </Button>
      {isReplying && <InsertCom to={to} noReply={noReply} refreshComments={refreshComments} />} 
    </div>
    {allComData.map(comp => {
      return <Comment comp={comp} refreshComments={refreshComments} />
    })}
  </div>
}