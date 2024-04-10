import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);

  const addTodo = (content) => {
    const newTodo = {
      id: todos.length + 1,
      content,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodoDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      addTodo(e.target.value.trim());
      e.target.value = ''; // 입력 필드 초기화
    }
  };

  return (
    <div className="App">
      <header>
        <h1>UMC Study Plan</h1>
      </header>
      <div id="app">
        <input
          type="text"
          id="newTask"
          placeholder="스터디 계획을 작성해보세요!"
          autoFocus
          onKeyPress={handleKeyPress}
        />
        <div id="lists-container">
          <section id="todo-section">
            <h2>해야 할 일</h2>
            <ul id="todoList">
              {todos.filter(todo => !todo.isDone).map(todo => (
                <li key={todo.id}>
                  {todo.content}
                  <button onClick={() => toggleTodoDone(todo.id)}>완료</button>
                </li>
              ))}
            </ul>
          </section>
          <section id="done-section">
            <h2>해낸 일</h2>
            <ul id="doneList">
              {todos.filter(todo => todo.isDone).map(todo => (
                <li key={todo.id}>
                  {todo.content}
                  <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}>삭제</button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;