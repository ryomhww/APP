import initDatabase from './db';

export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

export const addTodo = async (todo: Todo): Promise<number> => {
  const db = await initDatabase();
  const [result] = await db.executeSql(
    'INSERT INTO todos (title, completed) VALUES (?, ?)',
    [todo.title, todo.completed ? 1 : 0]
  );
  return result.insertId;
};

export const getTodos = async (): Promise<Todo[]> => {
  const db = await initDatabase();
  const [results] = await db.executeSql('SELECT * FROM todos');
  const todos: Todo[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    todos.push({
      id: results.rows.item(i).id,
      title: results.rows.item(i).title,
      completed: results.rows.item(i).completed === 1,
    });
  }
  return todos;
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  const db = await initDatabase();
  await db.executeSql(
    'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
    [todo.title, todo.completed ? 1 : 0, todo.id]
  );
};

export const deleteTodo = async (id: number): Promise<void> => {
  const db = await initDatabase();
  await db.executeSql('DELETE FROM todos WHERE id = ?', [id]);
};

