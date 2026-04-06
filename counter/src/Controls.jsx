import { useCounterControls } from "./store";

const Controls = () => {
  // const increment = useCounterStore((state) => state.increment);
  // const decrement = useCounterStore((state) => state.decrement);
  // const zero = useCounterStore((state) => state.zero);
  const {increment, decrement, zero} = useCounterControls()

  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={zero}>zero</button>
    </div>
  );
};

export default Controls;
