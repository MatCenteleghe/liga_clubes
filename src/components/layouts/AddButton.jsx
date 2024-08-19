import styles from "./AddButton.module.css";

function addButton({ type, text, addMatch }) {
  return (
    <>
      <button className={styles.btn} type={type} onClick={addMatch}>
        {text}
      </button>
    </>
  );
}
export default addButton;
