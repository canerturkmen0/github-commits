import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from './pages/error';
import Home from './pages/home';
import Commits from './pages/commits';
import Commit from './pages/commit';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:owner/:repo/commits' component={Commits} />
        <Route exact path='/:owner/:repo/commits/:id' component={Commit} />
        <Route exact path='/error/:status' component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
