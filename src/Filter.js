import { store } from "./todoApp";
import { useState, useEffect } from "react";

const Link = ({active, filterTodos, children}) => {
    if (active) {
        return <a className="active">{children}</a>;
      }
    return (
        <a 
        href="#"
        onClick={(e) => {
            e.preventDefault();
            filterTodos(); 
        }}
        >
            {children}
        </a>
    )
}
const FilterLink = ({filter, children}) => {
    // Use React state to trigger re-render when store changes
    const [state, setState] = useState(store.getState());
    // Use useEffect to subscribe and unsubscribe from the store
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {setState(store.getState())});
        return () => unsubscribe()
    }, []) // ([]) it only runs when the component mounts and unmounts.

    return (
        <Link 
        active={filter === state.visibilityFilter} // checking if the filter we got matches the visibilty filter state 
        filterTodos={() => store.dispatch({ // changing the visibilty filter state whith this new filter
            type: 'SET_VISIBILITY_FILTER',
            filter
        })}
        > 
            {children} 
        </Link>
    )
}
const Filter = () => {
    return (
        <div className="filter">
            <FilterLink filter='SHOW_ALL'>All</FilterLink>
            <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
            <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        </div>
    );
}
 
export default Filter;