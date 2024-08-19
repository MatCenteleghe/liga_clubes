import styles from "./Input.module.css";

function Input({ name, text, type, placeholder, handleChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        required
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoComplete="off"
      />
    </div>
  );
}

export default Input;
