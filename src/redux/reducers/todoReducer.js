const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "UPDATE_TODO":
      const updateTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload.todo : todo
      );
      return {
        ...state,
        todos: updateTodos,
      };
    case "DELETE_TODO":
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: filteredTodos,
      };

    default:
      return state;
  }
};
export default todoReducer;
