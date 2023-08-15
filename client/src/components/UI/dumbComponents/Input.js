const Input = ({ type, id, onChange, value, placeholder }) => {
  return <input type={type} id={id} onChange={onChange} value={value} placeholder={placeholder} />;
};

export default Input;
