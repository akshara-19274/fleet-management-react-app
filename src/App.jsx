import {useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function App(){
    const[isAuth,setIsAuth]=useState(false);
    return(
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/admin" element={
            <ProtectedRoute isAuth={isAuth}>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Login setIsAuth={setIsAuth}/>} />
        </Routes>
    );
  }