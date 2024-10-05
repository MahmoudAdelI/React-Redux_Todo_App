import AddTodo from "./AddTodo";
import Filter from "./Filter";
import VisibleTodoList from "./VisibleTodoList";
import { combineReducers } from "./redux";
import { createStore } from "./redux";

// Creating app's reducers and and states

const todo = (state, action) => {
  switch (action.type) {
      case 'ADD TODO':
          return {
              id: action.id,
              text: action.text,
              completed: false
          }
      case 'TOGGLE TODO':
          if(state.id !== action.id) {
              return state;
          } 
          return {
              ...state,
              completed: !state.completed
          };
          
  }
}
const todos = (state = [], action) => {
  switch (action.type) {
      case 'ADD TODO':
          return [
              ...state,
              // undefined because there's no existing state so we're adding one
              todo(undefined, action) 
          ];
      case 'TOGGLE TODO':
          return state.map(t => todo(t, action));
      default:
          return state;
  }
};
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
const todoAppMainReducer = combineReducers({todos, visibilityFilter});
export const store = createStore(todoAppMainReducer);
//.....................

export default function TodoApp() {
  return (
    <div className="container">
      <Filter />
      <AddTodo />
      <VisibleTodoList />
    </div>
  );
}

