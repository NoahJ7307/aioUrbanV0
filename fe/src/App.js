import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import Chat from './components/Chat';


function App() {
  return (

    <RouterProvider router={root}></RouterProvider>
    // <Chat />
  );
}

export default App;
