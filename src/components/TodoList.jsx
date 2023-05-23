import { useState } from "react";
import { connect } from "react-redux"
import { addTodo, updateTodo, deleteTodo } from '../redux/action/action'

const TodoList = ({ todos, addTodo, updateTodo, deleteTodo }) => {
    const [todoText, setTodoText] = useState('');

    const handleInputChange = (event) => {
        setTodoText(event.target.value);
    };

    const handleAddTodo = () => {
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false,
            };
            addTodo(todo);
            setTodoText('');
        }
    };

    const handleUpdateTodo = (id, completed) => {
        const updatedTodo = {
            ...todos.find((todo) => todo.id === id),
            completed: !completed,
        };
        updateTodo(id, updatedTodo);
    };

    const handleDeleteTodo = (id) => {
        deleteTodo(id);
    };

    return (
        <div>
            <input type="text" value={todoText} onChange={handleInputChange} />
            <button onClick={handleAddTodo}>Add Todo</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => handleUpdateTodo(todo.id, todo.completed)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = {
    addTodo,
    updateTodo,
    deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);