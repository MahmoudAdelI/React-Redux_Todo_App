import AddTodo from "./AddTodo";
import Filter from "./Filter";
import VisibleTodoList from "./VisibleTodoList";


export default function TodoApp() {
  return (
    <div className="container">
      <Filter />
      <AddTodo />
      <VisibleTodoList />
    </div>
  );
}

