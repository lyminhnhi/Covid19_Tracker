import React from "react";
import Home from "./pages/home"
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { ProtectedRoute } from './auth/protected';
import { AuthRoute } from './auth/authroute';
import { SignIn } from './pages/user/sign-in';
import { SignUp } from './pages/user/sign-up';
import { Detail } from './pages/detail';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Switch>
          <AuthRoute path='/signin' exact component={SignIn} />
          <AuthRoute path='/signup' exact component={SignUp} />
          <ProtectedRoute path='/' exact component={Home} />
          <ProtectedRoute path='/detail/:id' exact component={Detail} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
