import "./Input.scss";

const Input = ({
  type,
  disabled = false,
  required,
  value,
  setValue,
  label,
  placeholder,
  regEx,
  errorMessage,
  onBlur,
  onChange,
  error,
  min,
  marginBottom,
  name,
  ...props
}) => {

  return (

    <div style={{ marginBottom }} className="field-container">
      {label ? (
        <label className="label">
          {" "}
          {label} {required && <span className="star-required">*</span>}{" "}
        </label>
      ) : (
        <></>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          disabled={disabled}
          multiple={true}
          className={`input ${error && "input-error"}`}
          placeholder={`${placeholder}`}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          name={name}
          disabled={disabled}
          multiple={true}
          className={`input ${error && "input-error"}`}
          placeholder={`${placeholder}`}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          min={min}
          {...props}
        />
      )}
      {error && <span className="error-message"> {errorMessage} </span>}
    </div>
  );
}

export default Input;
