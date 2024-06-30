/** @format */
import "../styles/loadingStyles.css";
function Loading({ color = "black", noOfCircles = 9, width = "50px" }) {
  const circles = [];
  for (let i = 0; i < noOfCircles; i++)
    circles.push(
      <span
        className={`circle c${i + 1}`}
        style={{ backgroundColor: color }}
        key={i}
      ></span>
    );
  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
      }}
    >
      <div className="loading-stack">{circles}</div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
