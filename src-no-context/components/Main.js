/** @format */

function Main({ children }) {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "50vw",
    alignItems: "center",
  };
  return <main style={styles}>{children}</main>;
}
export default Main;
