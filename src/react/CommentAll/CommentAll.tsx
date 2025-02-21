import { useEffect, useRef, useState } from "react";
import * as React from 'react';
import * as am5 from "@amcharts/amcharts5";
import { Comment, type CommentProps } from "../comment/comment";
import { InsertCom } from "../insertComment/insertCom";
import { PhoneWire } from "./PhoneWire";
import { Button } from "@mui/material";
import { Barrage } from "../comment/Barrage";
import { extractPort } from "../../utils/path";
import CircularProgress from '@mui/material/CircularProgress';

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}
export function CommentAll() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const userInfo = useRef<any>('')
  const [isLoading, setisLoading] = useState(true)
  const [allComData, setallComData] = useState<CommentProps[]>([])

  const [wideEnough, setwideEnough] = useState(false)

  function setWidth() {

    const main = document.getElementsByTagName('main')
    const radio = main[0].clientWidth / window.innerWidth
    if (radio > 0.7) {
      setwideEnough(false)
    } else {
      setwideEnough(true)
    }
  }

  useEffect(() => {   

    const userInf = fetch('/api/user', {
			method: 'POST',
			headers: {
				Accept: "application/json",
    }})

    userInfo.current = userInf
    canvasRef.current!.width = 120
    
    refreshComments()
    
    setWidth()
    window.addEventListener('resize', setWidth)
    
    return () => {
      window.removeEventListener('resize', setWidth)
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
    setisLoading(true)
    const commentsJson = await fetch(`/api/comment?blogId=${blogId}`, {method: "GET"})
    const comments = await  commentsJson.json()
    
    setisLoading(false)
    setallComData(comments)
  }

  const to = {id: 'blog-' + blogId, name: ''}

  function initializeInsert() {
    setallComData([...allComData])
  }

  function destroyInsert () {
    setallComData([...allComData])
  }
  
  return <div style={{marginTop: "30px", position: "relative"}} ref={containerRef}>
    <canvas id="wire" ref={canvasRef} style={{ position: "absolute", left: "-40px", zIndex: 1}} />
    <div className="stickyCreateComment dark:bg-neutral-800 dark:text-neutral-300">
      <span style={{display: "inline-block",fontSize: "16px",fontWeight: "700", marginBottom: "10px"}}>评论：</span>
      <Button variant="text" style={{float: "right"}} onClick={reply}>
        添加评论
      </Button>
      {isReplying && <InsertCom initialize={initializeInsert} destroy={destroyInsert} to={to} noReply={noReply} refreshComments={refreshComments} />} 
    </div>
    {allComData.length === 0 && !isLoading && <div>暂无评论</div>}
    {allComData.map(comp => {
      return <Comment initialize={initializeInsert} destroy={destroyInsert} key={comp._id} comp={comp} refreshComments={refreshComments} />
    })}
    
    {<div style={{display: "flex", justifyContent: 'center', width: "100%"}}><GradientCircularProgress /></div>}

    {wideEnough ? allComData.map((comp, idx) => {
      return <Barrage key={idx} comp={comp} idx={idx} />
    }) : null}
  </div>
}
