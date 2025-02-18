import { memo, useEffect, useRef } from "react"
import type { CommentProps } from "./comment"

export const Barrage = memo(({comp, idx}: {comp: CommentProps, idx: number}) => {
  const windowRight = window.innerWidth + Math.random()* 100

  const dom = useRef<HTMLDivElement>(null)
  const centerArticle = useRef<HTMLElement>(document.getElementsByTagName('article')?.[0])

  let stop = false, passed = false
  
  const currrentTranslateX = useRef<number>(0)
  function startMove() {
    if (!dom.current || stop) return
    const articleBBX = centerArticle.current!.getBoundingClientRect()
    
    if (currrentTranslateX.current < -windowRight) {
      passed = false
      currrentTranslateX.current = 0
    } else if (currrentTranslateX.current < -(windowRight - articleBBX.right) && !passed) {
      passed = true
      currrentTranslateX.current = -(windowRight - articleBBX.right) -articleBBX.width
    } else {
      currrentTranslateX.current = currrentTranslateX.current - Math.max((3 - comp.likes.length * 0.2 - comp.comments.length * 0.1), 1)
    }
    
    const t = `translateX(${currrentTranslateX.current + 'px'})`
    dom.current!.style.transform = t;
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