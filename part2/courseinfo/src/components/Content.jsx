import Part from "./Part";
import Total from "./Total";
const Content = ({ content }) => {
  return (
    <div>
      {content.map((x) => (
        <Part key={x.id} part={x.name} exercises={x.exercises} />
      ))}
      <Total total={content} />
    </div>
  );
};

export default Content;
