import React, {Component} from 'react';
import CardList from './CardList';
//import {robots} from './robots';
import SearchBox from './SearchBox';
import './App.css';
import './LoadingScreen.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchValue: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json() )
        .then (users => this.setState({robots : users}));
    }

    onSearchChange = (event) => {
        this.setState({searchValue : event.target.value})
    }
    render() {
        
        const filteredRobots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return (
                <div>
                    <div class="back"><h1 className='tc'>Loading ....</h1></div>
                    <div class="cube"></div>
                </div>
            );
        }else {
            return(
                <div className='tc'>
                    <h1 className="f1"> Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <CardList robots={filteredRobots}/>
                </div>
            );

        }
    }
}

export default App;