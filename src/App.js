import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoursesContextProvider from './context/CoursesContext';
import Header from './components/common/Header';
import Main from './components/Main';
import NotFound from './components/NotFound';
import './assets/css/styles.css';

const App = () => (
	<BrowserRouter>
		<CoursesContextProvider>
			<Header />
			<Switch>
				<Route exact path='/'>	
					<Main />
				</Route>
				<Route component={ NotFound } />
			</Switch>
		</CoursesContextProvider>
    </BrowserRouter>
);

App.displayName = 'App';

export default App;