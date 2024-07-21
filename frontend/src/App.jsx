import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initI18n } from './services/LanguageService';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

initI18n();
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stats" element={<Statistics />} />
      </>
    )
  )

  return (
    <>
      <I18nextProvider i18n={i18next}>
        <GoogleOAuthProvider clientId="290987074567-aubqds8lertag869pqdkc8uc2m68rnn2.apps.googleusercontent.com">
          <RouterProvider router={router}/>
        </GoogleOAuthProvider>
      </I18nextProvider>
    </>
  )
}

export default App
