import { useEffect, useState } from "react";
import { store } from "./todoApp";


// returns a filtered version of data based on the filter value
const getVisibleTodos = (todos, filter) => { 
    switch(filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed );
    }
};
const Todo = ({ toggleTodo, text, completed }) => {
    // console.log(text);
    return (
        <li
        className="todo"
        // we passed it as an anonymous func so we don't invoke it here because it's accepting parameters (e.g todo.id)..
        onClick={toggleTodo} 
        style={{
            textDecoration: completed ? 'line-through' : 'none',
            backgroundColor: completed? '#ffffff1e' : '#212121'
        }}
        >
            {text}
        </li>
    )
}
const TodoList = ({todos, toggleTodo}) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => 
                <Todo
                key={todo.id} // key is not a prop it's a unique attribute to differentiate between items..
                toggleTodo={ () => toggleTodo(todo.id) } // passing it as a prop but not using it
                {...todo} // spread the rest of the todo obj proprties
                />
            )}
        </ul>
    )
}

const VisibleTodoList = () => {
    // Use React state to trigger re-render when store changes
    const [state, setState] = useState(store.getState());
    // Use useEffect to subscribe and unsubscribe from the store
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {setState(store.getState())});
        return () => unsubscribe()
    }, []) // ([]) it only runs when the component mounts and unmounts.

    return (
        <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        toggleTodo={id => {
            store.dispatch({
                type: 'TOGGLE TODO',
                id
            })
        }}
        />

    );
}
 
export default VisibleTodoList;