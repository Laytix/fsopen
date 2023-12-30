const Total = ({ total }) => {
  const sum = total.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);
  return <div>total of {sum} exercises</div>;
};

export default Total;
