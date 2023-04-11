import React from 'react'
import "./styles.scss"
import icons from "Assets/Icons"
const Avatars = () => {
  return (
    <div className='avatars'>
      <img className="myAvatar" src={icons.mcd}></img>
      <img className="companyAvatar" src={icons.face}></img>
    </div>
  )
}
export default Avatars