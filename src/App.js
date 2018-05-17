import React, { Component } from 'react';
import './stylesheets/styling.css';
import AnimalList from "./AnimalList";

class App extends Component {
    constructor() {
        super();
        this.state = {
            dogs: [],
            cats: [],
            parrots: [],
            eagles: [],
            allAnimals: [],
            isLoading: false,
            error: null,
            nameDescending: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://vision.klinik.fi/elukat.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data=> this.setState( {dogs: data.dogs, cats: data.cats, parrots: data.parrots, eagles: data.eagles, isLoading: false }))
            .then(this.mergeArrays)
            .catch(error => this.setState({ error, isLoading: false }));
    };

    mergeArrays = () => {
        const { dogs, cats, parrots, eagles } = this.state;
        const allAnimals = [...cats, ...dogs, ...parrots, ...eagles];
        this.setState({ allAnimals: allAnimals });
    };
    sortByName = () => {
        const sortedByName= this.state.allAnimals.sort(function(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        this.setState({ allAnimals: sortedByName})
    };
    render() {

        const { allAnimals, isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>
        }
        if (isLoading) {
            return <p> Loading ...</p>;
        }
        return (
            <div className="container">
                <header>
                    <h1>Elukat</h1>
                </header>
                <div id="try">
                    <table id="animals">
                        <thead>
                        <tr>
                            <th id="name" onClick={this.sortByName}>Nimi</th><th>Rotu</th><th>Ikä</th><th>Asuinpaikka</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimalList animals={allAnimals}/>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
