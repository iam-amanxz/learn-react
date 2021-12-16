// The term “render prop” refers to
// a technique for sharing code between React
// components using a prop whose value is a function.

// A component with a render prop takes a function
// that returns a React element and calls it
// instead of implementing its own render logic.

// Use Case:
// I want to fetch data from an API and use it in multiple
// components. Since the data fetching logic is the same I want to
// extract the logic and reuse in all other components

import { useEffect, useState } from 'react';

type FetchTodoProp = {
  render: (todos: Todo[] | []) => React.ReactNode;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodosState = Todo[] | [];

const FetchTodos = (props: FetchTodoProp) => {
  const [todos, setTodos] = useState<TodosState>([]);

  useEffect(() => {
    (() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.clone().json())
        .then((data) => {
          setTodos(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return <>{props.render(todos)}</>;
};

type CatProps = {
  todos: Todo[];
};

const ComponentOne = ({ todos }: CatProps) => {
  return (
    <div>
      <h1>Component One</h1>
      <ul>
        {todos.splice(0, 10).map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

const ComponentTwo = ({ todos }: CatProps) => {
  return (
    <div>
      <h1>Component Two</h1>
      <ul>
        {todos.splice(20, 30).map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

function RenderProps() {
  return (
    <div className="App">
      <FetchTodos render={(todos) => <ComponentOne todos={todos} />} />
      <FetchTodos render={(todos) => <ComponentTwo todos={todos} />} />
    </div>
  );
}

export default RenderProps;
