import { memo, useEffect, useRef } from "react"
import anime from "animejs"
import type { CommentProps } from "./comment"

export const Barrage = memo(({comp, idx}: {comp: CommentProps, idx: number}) => {
  const windowRight = window.innerWidth + Math.random()* 100

  const dom = useRef<HTMLDivElement>(null)
  const centerArticle = useRef<HTMLElement>(document.getElementsByTagName('article')?.[0])

  let stop = false, passed = false
  function startMove() {
    if (!dom.current || stop) return
    const articleBBX = centerArticle.current!.getBoundingClientRect()
    const left = Number(dom.current?.style.left.slice(0, -2))
    if (left < 0) {
      passed = false
      dom.current!.style.left = windowRight + 'px'
    } else if (left < articleBBX.left + articleBBX.width && !passed) {
      passed = true
      dom.current!.style.left = articleBBX.left + 'px'
    } else {
      dom.current!.style.left = left - 1 + 'px'
    }
    requestAnimationFrame(startMove)
  }
  useEffect(() => {
    requestAnimationFrame(startMove)
    
    return () => {
      stop = true
    }
  }, )

  const initialY = `calc(20% + ${idx * 30}px)`
  
  return <div ref={dom} style={{position: "fixed", top: initialY, left: `${windowRight}px`, zIndex: -999, width: "100%", fontSize: "20px"}} dangerouslySetInnerHTML={{__html: comp.content}}></div>
})