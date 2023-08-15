const TextArea = ({ rows, id, onChange }) => {
  return <textarea rows={rows} id={id} onChange={onChange} />;
};

export default TextArea;
