import { useState } from "react";
import { connect } from "react-redux"
import styles from './TodoList.css'
import { addTodo, updateTodo, deleteTodo, setFilter, editTodo, toggleChecklist } from '../redux/action/action'


const TodoList = ({ todos, filter, addTodo, updateTodo, deleteTodo, setFilter, toggleChecklist, editTodo }) => {
    const [todoText, setTodoText] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoText, setEditTodoText] = useState('');

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

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const handleEditTodo = (id, text) => {
        setEditTodoId(id);
        setEditTodoText(text);
    };

    const handleEditInputChange = (event) => {
        setEditTodoText(event.target.value);
    };

    const handleSaveEditTodo = (id) => {
        editTodo(id, editTodoText);
        setEditTodoId(null);
        setEditTodoText('');
    };
    const handleToggleChecklist = (id) => {
        toggleChecklist(id)
    }

    const filteredTodos = () => {
        switch (filter) {
            case 'ACTIVE':
                return todos.filter((todo) => !todo.completed);
            case 'COMPLETED':
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };

    return (
        <div>
            <h1>ADD MY TASK LIST</h1>
            <div className="wrapper">
                <input className="input" placeholder="Add your task" type="text" value={todoText} onChange={handleInputChange} />
                <button className="button" onClick={handleAddTodo}>Add Todo</button>
            </div>

            <div className="filter-button">
                <button className="button-f" onClick={() => handleFilterChange('ALL')}>All</button>
                <button className="button-f" onClick={() => handleFilterChange('ACTIVE')}>Active</button>
                <button className="button-f" onClick={() => handleFilterChange('COMPLETED')}>Completed</button>
            </div>

            <ul className='tasks'>
                {filteredTodos().map((todo) => (
                    <li className="task" key={todo.id} >
                        <div className="task-group">
                            <input className="checkbox" type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleChecklist(todo.id)} />
                            {editTodoId === todo.id ? (
                                <>
                                    <input className="input" type="text" value={editTodoText} onChange={handleEditInputChange} />
                                    <button className="button" onClick={() => handleSaveEditTodo(todo.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span
                                        style={{
                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                        }}
                                        onClick={() => handleUpdateTodo(todo.id, todo.completed)}
                                    >
                                        {todo.text}
                                    </span>
                                    <button className="button" onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                                    <button className={`button ${styles.delete}`} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                </>
                            )}
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
    filter: state.filter,
});

const mapDispatchToProps = {
    addTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    editTodo,
    toggleChecklist
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);