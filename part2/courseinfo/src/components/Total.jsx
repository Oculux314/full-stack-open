export const Total = ({ parts }) => {
  function getTotal(parts) {
    return parts.reduce((sum, part) => sum + part.exercises, 0);
  }

  return (
    <p>
      <strong>total of {getTotal(parts)} exercises</strong>
    </p>
  );
};
