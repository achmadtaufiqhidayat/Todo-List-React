export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const updateTodo = (id, todo) => ({
  type: "UPDATE_TODO",
  payload: { id, todo },
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: id,
});

export const setFilter = (filter) => ({
  type: "SET_FILTER",
  payload: filter,
});

export const editTodo = (id, updatedText) => ({
  type: "EDIT_TODO",
  payload: { id, updatedText },
});

export const toggleChecklist = (id) => ({
  type: "TOGGLE_CHECKLIST",
  payload: id,
});
