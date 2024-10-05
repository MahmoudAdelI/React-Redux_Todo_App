import { store } from "./storeInit";

const AddTodo = () => {
    
    let nextTodoId = 0;
    let input;

    const handleSubmit = e => {
        e.preventDefault();
        if(!input.value.trim()) return; // prevent empty values
                store.dispatch({
                    type: "ADD TODO",
                    id: nextTodoId++,
                    text: input.value.trim()
                });
                input.value = '';
                
    }
    return (
        <form
        className="add-todo"
        onSubmit={handleSubmit} 
        >
            <input 
            placeholder="type your todos here..."
            type="text"
            ref={node => {input = node}} 
            />
            <button type="submit">Add todo</button>
        </form>
    );
}
 
export default AddTodo;