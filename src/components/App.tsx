import SearchUserPage from '../pages/SearchUserPage'
import UserDitailsPage from '../pages/UserDitailsPage';
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
    <ToastContainer autoClose={2000} />
    <Switch>
      <Route exact path='/' component={SearchUserPage} />
      <Route  path='/userRepo' component={UserDitailsPage}/>
    </Switch>
    </>
  );
}

export default App;
