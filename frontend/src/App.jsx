import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
        <Route path="stats" element={<Statistics />} />
      </>
    )
  )

  return (
    <>
      <GoogleOAuthProvider clientId="290987074567-aubqds8lertag869pqdkc8uc2m68rnn2.apps.googleusercontent.com">
        <RouterProvider router={router}/>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
