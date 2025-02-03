import { useRef, useState } from "react";
import { Like } from "../like/like"
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { InsertCom } from "../insertComment/insertCom";
import { Barrage } from "./Barrage";
import zIndex from "@mui/material/styles/zIndex";
export interface CommentProps {
  author:string,
  toComment: string, 
  likes: string[],
  content: string,
  createTime: number,
  location: string,
  userInfo?: any,
  comments: string[],
  canDel?: boolean,
  blogId: string,
  _id?: string,
  checked?: boolean,
}

export function Comment ({comp, refreshComments}: {comp: CommentProps, refreshComments: () => void}) {
  const {canDel, toComment, likes, comments, content, createTime, location, checked} = comp
  
  const [isReplying, setisReplying] = useState(false)
  const containerStyle = {width: "calc(100% - 40px)", marginLeft: "40px", border: "1px solid #446b87", borderRadius: "5px", padding: "10px", marginBottom: "10px", backgroundColor: "#ffffff", position: "relative", zIndex: 2}
  const wrapperStyle = {}
  if (toComment.length === 0) {
    containerStyle.width = "calc(100% - 40px)";
    (containerStyle as any).marginLeft = "40px"
  }
  if (!comp.toComment.startsWith('blog')) {
    // @ts-ignore
    wrapperStyle.paddingLeft = "50px"
  }

  function reply() {
    setisReplying(!isReplying)
  }

  const containerRef = useRef(null)

  function noReply() {
    setisReplying(false)
  }

  async function deleteComment() {
    await fetch('/api/comment', {method: "Delete", body: JSON.stringify(comp)})
    await refreshComments()
  }
  
  const to = {id: comp._id!, name: comp.userInfo?.[0]?.name}

  async function handleClick(isChecked: boolean) {
    await fetch(`/api/like`, {method: "POST", body: JSON.stringify({
      commentId: comp._id,
      isChecked: isChecked
    })})

    await refreshComments()
  }
  
  return <div style={wrapperStyle} id={comp._id} >
    <div style={containerStyle} ref={containerRef}>
    <div style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>{to.name} <span style={{fontSize: "14px", color: "#7C7C7C"}}>@{location}@{new Date(createTime).toLocaleString()}</span></span>
      <div style={{display: "flex", alignItems: "center"}}>
          <IconButton  onClick={() => reply()}>
            <svg style={{marginBottom: "2px"}} className="icon" t="1737474292878" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4529" width="25" height="25"><path d="M937.664 896C884.928 746.944 743.104 640 576 640v128a64.106667 64.106667 0 0 1-33.792 56.448 63.872 63.872 0 0 1-65.664-3.2l-384-256a64 64 0 0 1-0.064-106.496l384-256A64.021333 64.021333 0 0 1 576 256v128c212.032 0 384 171.968 384 384 0 44.928-8.128 87.936-22.336 128z" fill="#aab8c2" p-id="4530"></path></svg>
          </IconButton>
          {comments?.length ?? 0}
          <IconButton>
            <Like onClick={handleClick} initialCheck={checked} />
        </IconButton>
        {likes.length}

        {canDel && 
        <IconButton onClick={deleteComment}>
          <DeleteIcon  style={{ color: '#AAB8C2' }}  />
        </IconButton>}
      </div>
    </div>
    <div dangerouslySetInnerHTML={{__html: content}}></div>
      {isReplying && <InsertCom to={to} noReply={noReply} refreshComments={refreshComments} />} 
  </div>
  </div>
}