import React, {Component} from 'react';

import './App.css';
import Loading from '../components/Loading';
import '../components/LoadingScreen.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
//import ErrorBoundary from '../components/ErrorBoundary';
//import {robots} from './robots';
//import {setSearchField} from '../actions';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json() )
        .then (users => this.setState({robots : users}));
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !robots.length ?
        (   
            <Loading />
        ):     
        (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <CardList robots={filteredRobots} />
            </Scroll>
            </div>
        );       
            
    }

}

export default App;