import React, {Component} from 'react';
import CardList from '../components/CardList';
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import '../components/LoadingScreen.css';
import Scroll from '../components/Scroll';
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
        const {robots, searchValue} = this.state;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        if (!robots.length) {
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
                    <Scroll>
                        <CardList robots={filteredRobots}/> 
                    </Scroll>
                </div>
            );

        }
    }
}

export default App;