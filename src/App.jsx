import React from 'react';
import { Router } from "@reach/router"
import Loading from './components/shared/Loading/Loading';

import './App.scss'

const Home = React.lazy(() => import('./containers/Home/Home'));
const ViewPokemon = React.lazy(() => import('./containers/ViewPokemon/ViewPokemon'));
const Types = React.lazy(() => import('./containers/Types/Types'));


function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
          <Home path="/" />
          <ViewPokemon path="pokemon/:name" />
          <Types path="type/:name" />
      </Router>
    </React.Suspense>
  );
}

export default App;
