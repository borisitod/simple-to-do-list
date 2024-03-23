// TodoList.js
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { useDrag } from 'react-dnd';
import './todoList.css'; // Import CSS file for TodoList component

const TodoItem = ({ item, onItemDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'TODO_ITEM', id: item.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="todo-item"
    >
      <span>{item.text}</span>
      <button onClick={() => onItemDelete(item.id)}>Delete</button>
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [value, onChange] = useState(new Date());

  const handleItemDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDrop = (itemId, date) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === itemId) {
        return { ...todo, date };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list">
      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
            onItemDelete={handleItemDelete}
          />
        ))}
      </div>
      <div className="calendar">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default TodoList;
