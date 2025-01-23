import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import "./insertCom.css"

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

  export type InsertComProps = {
    pos: {
      left: string,
      top: string,
    }
    width: string
  }

export function InsertCom ({pos, width}: InsertComProps) {
  const [value, setValue] = useState('');
  const containerStyle = {position: "fixed", marginTop: "10px", border: "1px solid #2fa5fb", borderRadius: "5px", padding: "10px", left: pos.left, top: pos.top, backgroundColor: "#ffffff", width, minHeight:"200px"} as any
  
  return <div style={containerStyle}>
    <div style={{position: "relative", display: "flex", alignItems: "center", marginBottom: "10px"}}><span style={{color: "#7C7C7C", }}>回复：</span>小明
    </div>
    <ReactQuill theme="snow" value={value} onChange={setValue} bounds='#full-container .ql-container'  modules={editorModules} />
    <div style={{display: "flex", flexDirection: "row-reverse", marginTop: "10px"}}>
      <Button variant="contained" startIcon={<SendIcon />} style={{marginLeft: "10px"}}>发送</Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>取消</Button>
    </div>
  </div>
}