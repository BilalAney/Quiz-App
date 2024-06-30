/** @format */

function Header({ children, img }) {
  const styles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "30px",
    width: "100%",
    margin: "25px",
  };
  return (
    <div className="logo" style={styles}>
      <img
        src={img}
        alt="The Main Logo"
        style={{ width: "128px", objectFit: "cover" }}
      />
      <h1>{children}</h1>
    </div>
  );
}

export default Header;
