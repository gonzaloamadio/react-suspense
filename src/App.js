import React, { Component, Suspense } from 'react'; // NEW: import of Suspense
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';

// This is a dynamic import statement. It will be executed
// when this code runs. And this code will run when the component
// is rendered.
// Pass to import the path to the file where the component is.
// We must use default exports; named exports are not supported.
const Posts = React.lazy(() => import('./containers/Posts'));

// We can check that it is working with the developer tools.
// If we go to the Network tab, when we click on the Post page link,
// we will see that a chunk file is loaded.
class App extends Component {
  state = { showPosts: false };

  modeHandler = () => {
    this.setState(prevState => {
      return { showPosts: !prevState.showPosts };
    });
  };


  render() {
    return (

      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.showPosts ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>
        ) : (
          <User />
        )}
      </React.Fragment>

      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route
      //       path="/posts"
      //       render={() => (
      //       // The fallback will be displayed in case that React
      //       // postpones the re-rendering if this wrap component
      //       // and shows as well fallback
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //       )}
      //     />
      //   </React.Fragment>
      // </BrowserRouter>


    );
  }
}

export default App;
