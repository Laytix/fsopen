import Content from "./Content";
import Header from "./Header";
const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
  );
};

export default Course;
