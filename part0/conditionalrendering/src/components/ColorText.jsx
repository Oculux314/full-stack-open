const ColorText = ({ color }) => {
  const hex = color ? "#07acff" : "#ffc107";
  const text = `${color ? "Blue" : "Orange"} Text`;

  const style = {
    color: hex,
    background: "white",
    fontSize: "20px",
    fontColor: hex,
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    width: "20%",
  };

  return <div style={style}>{text}</div>;
};

export default ColorText;
