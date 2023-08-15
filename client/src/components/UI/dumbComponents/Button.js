const Button = ({ onClick, disabled = false, type = 'button', className, children }) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
