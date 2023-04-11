import icons from "Assets/Icons";
import { useEffect, useState } from 'react'
import "./Input.scss"

function PasswordInput({ actualPassword, value, setValue, marginBottom }) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) { validatePassword() }
  }, [value])

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  }

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev)
  }

  const validatePassword = () => {
    if (!(actualPassword == value)) {
      setError(true)
    }
    else {
      setError(false)
    }
  }

  return (
    <div style={{ marginBottom }} className='password-field-conatiner'>
      <label className='password-field-label'>Confirm Password<span className='star-required'>*</span></label>
      <div className='password-input-wrapper'>
        <input type={!showPassword && 'password'} className={`password-field-input ${error && 'input-error'}`} value={value} onChange={inputChangeHandler} onBlur={validatePassword} placeholder='Type your password' />
        <img onClick={showPasswordHandler} src={!showPassword ? icons.hide : icons.show} />
      </div>
      {error && <span className='error-message'>Password does not match!</span>}
    </div>
  )
}

export default PasswordInput