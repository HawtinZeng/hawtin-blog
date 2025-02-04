import { useEffect, useRef, useState } from "react";

import * as am5 from "@amcharts/amcharts5";
import { Comment, type CommentProps } from "../comment/comment";
import { InsertCom } from "../insertComment/insertCom";
import { PhoneWire } from "./PhoneWire";
import { Button } from "@mui/material";
import { Barrage } from "../comment/Barrage";
import { extractPort } from "../../utils/path";

export function CommentAll() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const userInfo = useRef<any>('')
  const [allComData, setallComData] = useState<CommentProps[]>([])

  useEffect(() => {

    const userInf = fetch('/api/user', {
			method: 'POST',
			headers: {
				Accept: "application/json",
    }})

    userInfo.current = userInf
    canvasRef.current!.width = 120
    
    refreshComments()
    return () => {
    }
  }, [])  
  
  const [zoom, setzoom] = useState(0)
  function handleResize() {
    setzoom(window.devicePixelRatio!)
  }
  useEffect(() => {
    setzoom(window.devicePixelRatio!)
    window.addEventListener('resize', handleResize);
    
    PhoneWire.colorSet = am5.ColorSet.new(am5.Root.new('wire'), {step: 3})
    
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect(() => {

    const id2Position = new Map()
    const lineDir = new Map()

    const idComp = new Map()
    const includedRoot = new Map()
    
    const bounds = containerRef.current?.getBoundingClientRect()
    
    canvasRef.current!.style.height = bounds!.height + 'px'
    canvasRef.current!.style.width = 150 + 'px'
    
    const ratio = window.devicePixelRatio
    canvasRef.current!.height = bounds!.height * ratio
    canvasRef.current!.width = 150 * ratio
    const ctx = canvasRef.current!.getContext('2d')
    ctx?.scale(ratio, ratio)

    allComData.map(comp => {
      idComp.set(comp._id, comp)
      
      if (!(comp.toComment as string).startsWith('blog')) 
        lineDir.set(comp._id, comp.toComment)
      const commentDom = document.getElementById(comp._id!)!
      id2Position.set(comp._id, {x: commentDom.offsetLeft + Number(commentDom.style.paddingLeft.slice(0, -2)) + 80, y: commentDom.offsetTop + commentDom.offsetHeight / 2})
    })

    allComData.map(comp => {
      let parent = comp
      while(!(parent.toComment  as string).startsWith('blog')) {
        parent = idComp.get(parent.toComment)
      }
      includedRoot.set(comp._id, parent._id)
    })
    
    if (id2Position.size > 0) {
      new PhoneWire(canvasRef.current!, id2Position, lineDir, includedRoot)
    }

  }, [allComData, zoom])
  
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

  const blogId = extractPort(2)

  async function refreshComments() {
    
    const commentsJson = await fetch(`/api/comment?blogId=${blogId}`, {method: "GET"})
    const comments = await  commentsJson.json()
    setallComData(comments)
  }

  const to = {id: 'blog-' + blogId, name: ''}
  const themeBg = localStorage.theme === 'dark' ? 'dark:bg-neutral-800' : ''
  
  return <div style={{marginTop: "30px", position: "relative"}} ref={containerRef}>
    <canvas id="wire" ref={canvasRef} style={{ position: "absolute", left: "-40px", zIndex: 1}} />
    <div style={{padding: "10px 0", position: "sticky", top: "0px", zIndex: 999}} className={themeBg}>
      <span style={{display: "inline-block",fontSize: "16px",fontWeight: "700", marginBottom: "10px"}}>评论：</span>
      <Button variant="text" style={{float: "right"}} onClick={reply}>
        添加评论
      </Button>
      {isReplying && <InsertCom to={to} noReply={noReply} refreshComments={refreshComments} />} 
    </div>
    {allComData.length === 0 && <div>暂无评论</div>}
    {allComData.map(comp => {
      return <Comment  key={comp._id} comp={comp} refreshComments={refreshComments} />
    })}

    {allComData.map((comp, idx) => {
      return <Barrage key={idx} comp={comp} idx={idx} />
    })}
  </div>
}
