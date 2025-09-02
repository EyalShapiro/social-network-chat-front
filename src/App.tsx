import AppRouter from './router';

function App() {
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <AppRouter />
    </div>
  );
}

export default App;
