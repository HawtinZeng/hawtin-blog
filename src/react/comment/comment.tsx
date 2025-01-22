import { useRef } from "react";
import { Like } from "../like/like"
import "./comment.css"
import { IconButton } from '@mui/material'
interface CommentProps {
  onReply: (a: any) => void; // Define the event handler prop
  isSub: boolean;
}
export function Comment ({onReply, isSub}: CommentProps) {
  const containerStyle = {width:  "100%", border: "1px solid #446b87", borderRadius: "5px", padding: "10px", marginBottom: "10px"}
  if (isSub) {
    containerStyle.width = "calc(100% - 40px)"
    containerStyle.marginLeft = "40px"
  }

  const containerRef = useRef(null)
  return <div style={containerStyle} ref={containerRef}>
    <div onClick={() => onReply(containerRef.current)} style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>小明 <span style={{fontSize: "14px", color: "#7C7C7C"}}>@北京@2025.1.22 11:47</span></span>
    <div>
      <IconButton>
          <svg className="icon" t="1737474292878" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4529" width="25" height="25"><path d="M937.664 896C884.928 746.944 743.104 640 576 640v128a64.106667 64.106667 0 0 1-33.792 56.448 63.872 63.872 0 0 1-65.664-3.2l-384-256a64 64 0 0 1-0.064-106.496l384-256A64.021333 64.021333 0 0 1 576 256v128c212.032 0 384 171.968 384 384 0 44.928-8.128 87.936-22.336 128z" fill="#aab8c2" p-id="4530"></path></svg>
        </IconButton>
        <IconButton>
          <Like />
        </IconButton>
    </div>
    </div>
    <div className="ellipsis">你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样你怎么这样</div>
  </div>
}