import React from 'react';
    import { Route, Routes } from 'react-router-dom';
    import Login from './components/Login';
    import Dashboard from './components/Dashboard';
    import RequireAuth from './components/RequireAuth';

    function App() {
      return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          </Routes>
      );
    }

    export default App;
