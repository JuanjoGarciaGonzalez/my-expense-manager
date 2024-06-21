import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Dashboard />}>
        <Route path="help" element={<Help />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
