const Form = ({ children, onSubmit, className, id }) => {
  return (
    <form id={id} onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
