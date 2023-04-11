import React from 'react'
import "./styles.scss"
import icons from "Assets/Icons"
const Avatar = ({photourl}) => {
  return (
    <div className='avatar'>
      <img className="userIcon" src={ photourl ? photourl :icons.face}></img>
    </div>
  )
}
export default Avatar