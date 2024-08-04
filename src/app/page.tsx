import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <TodoList />
    </main>
  );
}
