function Input({ placeholder, key, label, type, labelclass, inputclass }) {
  return (
    <section key={key}>
      <label className={labelclass}>{label}</label>
      <input className={inputclass} type={type} placeholder={placeholder} />
    </section>
  );
}

export default Input;
