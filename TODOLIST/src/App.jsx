import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_DATA } from './graphql/queries';
import React from 'react';
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from './graphql/mutations';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [userInput, setUserInput] = React.useState('');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { todos } = data;

  async function handleAddTodo(event) {
    event.preventDefault();
    if (!userInput.trim()) return;
    const variables = {
      text: userInput,
    };
    await addTodo({ variables, refetchQueries: [{ query: GET_ALL_DATA }] });
  }

  /*function handleClick(event) {
    event.preventDefault();

    console.log(userInput);
  }
  */

  async function handleToggleTodo({ id, done }) {
    const variables = {
      id,
      done: !done,
    };
    await toggleTodo({ variables });
  }

  async function handleDeleteTodo({ id }) {
    const isConfirmed = window.confirm('really?');
    if (isConfirmed) {
      const variables = {
        id,
      };
      await deleteTodo({
        variables,
        update: (cache) => {
          const prevData = cache.readQuery({ query: GET_ALL_DATA });
          const newData = prevData.todos.filter((todos) => todos.id !== id);
          cache.writeQuery({ query: GET_ALL_DATA, data: { todos: newData } });
        },
      });
    }
  }

  return (
    <div className="bg-indigo-50">
      <div className="sticky top-0 bg-white text-4xl text-center font-bold p-5 shadow-2xl">
        HASURA GRAPHQL
      </div>
      <form
        className=" flex  justify-center items-center"
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          placeholder="Add a Todo"
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Create a Todo</button>
      </form>
      <div className="flex h-screen items-center justify-center px-4">
        <div className="grid gap-4 grid-cols-2">
          {todos.map((todos) => {
            const { id, done, text } = todos;

            return (
              <div
                key={id}
                className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl m-2 p-5 "
                onDoubleClick={() => handleToggleTodo(todos)}
              >
                <span className={`${todos.done && 'line-through'} `}>
                  <div>
                    <b>Todo List:</b> {text}
                    <button
                      className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteTodo(todos)}
                    >
                      &times;
                    </button>
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
