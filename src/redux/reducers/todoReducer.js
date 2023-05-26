const initialState = {
  todos: [],
  filter: "all",
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
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "EDIT_TODO":
      const editedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.updatedText }
          : todo
      );
      return {
        ...state,
        todos: editedTodos,
      };

    case "TOGGLE_CHECKLIST":
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: toggledTodos,
      };

    default:
      return state;
  }
};
export default todoReducer;
