import FacebookIcon from "Assets/Icons/facebook.png"
import GoogleIcon from "Assets/Icons/google.png"
import "./Buttons.scss"
function SocialLoginButton({ name, onClick, marginBottom }) {
  return (
    <button style={{ marginBottom }} className='social-login-button' onClick={onClick}>
      <img src={name == 'Google' ? GoogleIcon : FacebookIcon} />   Continue with {name}</button>
  )
}

export default SocialLoginButton