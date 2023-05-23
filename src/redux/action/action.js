export const addTodo = (todo) =>({
    type: 'ADD_TODO',
    payload: todo,
});

export const updateTodo = (id,todo) =>({
    type: 'UPDATE_TODO',
    payload: {id,todo},
})

export const deleteTodo = (id) =>({
    type: 'DELETE_TODO',
    payload: id,
})