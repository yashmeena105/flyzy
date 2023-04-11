import React from 'react'
import './styles.scss'
const SimpleColoredTag = ({text, color}) => {
  return (
    <div className={`tag-colored ${color}`}>{text}</div>
  )
}

export default SimpleColoredTag