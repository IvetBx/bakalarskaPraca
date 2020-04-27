import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import ListRecipes from './components/ListRecipes';
import RepositoryApp from './config/RepositoryApp';



class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <RepositoryApp />
      </div>
    );
  }
}

export default App;
