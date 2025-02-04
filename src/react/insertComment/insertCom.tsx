import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import "./insertCom.css"
import type { CommentProps } from '../comment/comment';

const editorModules = { syntax: false,
  toolbar: [
    [ { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    [
      { header: '1' },
      { header: '2' },
      'blockquote',
      'code-block',
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }, { align: [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean'],
  ]}

export function InsertCom ({noReply, refreshComments, to}: {noReply: ()=>void, refreshComments: () => void, to: {id: string, name: string}}) {
  const [value, setValue] = useState('');
  const containerStyle = { marginTop: "10px", border: "1px solid #2fa5fb", borderRadius: "5px", padding: "10px", backgroundColor: "#ffffff", minHeight:"200px"} as any

  async function send () {
    
    const paths = window.location.pathname.split('/');
    const blogId = paths[paths.length - 1]
    const comment: CommentProps = {
      author: "",
      toComment: to.id, 
      likes: [],
      content: value,
      createTime: new Date().getTime(),
      blogId,
      comments: []
    }
    await fetch('/api/comment', {method: "POST", body: JSON.stringify(comment)})
    noReply()
    refreshComments()
  }
  
  return <div style={containerStyle}>
    <div style={{position: "relative", display: "flex", alignItems: "center", marginBottom: "10px"}}><span style={{color: "#7C7C7C", }}>回复：</span>{to.name}
    </div>
    <ReactQuill theme="snow" value={value} onChange={setValue} bounds='#full-container .ql-container'  modules={editorModules} />
    <div style={{display: "flex", flexDirection: "row-reverse", marginTop: "10px"}}>
      <Button variant="contained" startIcon={<SendIcon />} style={{marginLeft: "10px"}}  onClick={send}>发送</Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={noReply}>取消</Button>
    </div>
  </div>
}