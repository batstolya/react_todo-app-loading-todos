/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user?.id)
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        })
        .catch(() => {
          setIsError(true);
          setErrorMessage('Something went wrong');
        });
    }
  }, []);

  const closeErrorMassage = () => {
    setIsError(false);
  };

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList todos={todos} />

        {Boolean(todos.length) && <Footer />}
      </div>

      <ErrorNotification
        isError={isError}
        errorMessage={errorMessage}
        onCloseError={closeErrorMassage}
      />
    </div>
  );
};
