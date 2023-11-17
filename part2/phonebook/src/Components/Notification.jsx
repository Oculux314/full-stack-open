import React from "react";

const Notification = ({ notification }) => {
  if (!notification) return <></>;

  const { message, isError } = notification;
  const color = isError ? "red" : "green";

  const style = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    fontColor: color,
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
  };

  return (
    <div style={style} className="notification">
      {message}
    </div>
  );
};

export default Notification;
