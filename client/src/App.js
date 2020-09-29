import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewDocument from './pages/NewDocument/NewDocument';
import OldDocument from './pages/OldDocument/OldDocument';
import BrowseDocuments from './pages/BrowseDocuments/BrowseDocuments';
import SignIn from './pages/SingIn/SingIn';
import SignUp from './pages/SignUp/SignUp';
import Landing from './pages/Landing/Landing';
import MyStudents from './pages/MyStudents/MyStudents';
import { AuthProvider } from './utils/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Switch >
          <Route path='/sign-in' exact component={SignIn} />
          <Route path='/sign-up' exact component={SignUp} />
          <PrivateRoute path='/myStudents/:tutorId' exact component={MyStudents} /> {/* Should be the only one with /:tutorId eventually */}
          <PrivateRoute path='/:studentId/new/:tutorId' exact component={NewDocument} />
          <PrivateRoute path='/:studentId/:lessonId/:tutorId' exact component={OldDocument} />
          <PrivateRoute path='/:studentId/:tutorId' exact component={BrowseDocuments} />
          <Route path='/' exact component={Landing} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
