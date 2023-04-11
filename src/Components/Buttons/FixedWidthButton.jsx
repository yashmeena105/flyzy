import "./Buttons.scss";

function FixedWidthButton({
  name,
  loading,
  onClick,
  marginBottom,
  maxWidth,
  ariaControls,
  ariaExpanded,
  theme = "standard",
  type,
}) {
  return (
    <button
      style={{ marginBottom, maxWidth }}
      className={`fixed-width-button ${theme}`}
      type={type}
      onClick={onClick}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
    >
      {loading ? "..." : `${name}`}
    </button>
  );
}

export default FixedWidthButton;
