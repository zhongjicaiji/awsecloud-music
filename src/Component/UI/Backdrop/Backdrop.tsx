import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Backdrop.module.css'

const backdrop=document.getElementById('backdrop-root') as HTMLElement
function Backdrop(props:any) {
  return ReactDOM.createPortal(<div className={classes.backdrop}>
    {props.children}
  </div>,backdrop)
}

export default Backdrop