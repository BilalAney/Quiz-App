/** @format */

function ProgressBar({
  backgroundColor = "lightgrey",
  color = "lightblue",
  width = "200px",
  height = "30px",
  current = "15",
  outOf = "100",
  borderRadius = "8px",
}) {
  const progress = Math.ceil((current / outOf) * 100) + "%";
  const styles = { backgroundColor, height, width, borderRadius };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "start",
        alignItems: "start",
        width: "inherit",
      }}
    >
      <div width={width} style={styles}>
        <div
          style={{
            height: "inherit",
            backgroundColor: color,
            width: progress,
            borderRadius,
            transition: "all 0.15s",
          }}
        >
          {Number.parseInt(progress) >= 15 && progress}
        </div>
      </div>
      <p>
        {current} / {outOf}
      </p>
    </div>
  );
}
export default ProgressBar;
