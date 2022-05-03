function Button({ name, key, handle, typeBtn }) {
  return (
    <button
      onClick={(e) => {
        handle(e);
      }}
      key={key}
      type={typeBtn}
    >
      {name}
    </button>
  );
}

export default Button;
