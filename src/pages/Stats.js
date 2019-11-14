import React from 'react'
import StatsCat from '../components/Stats-Cat';
import { cats } from '../api/Firebase';

export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: null,
            number: null
        }
    }

    async componentDidMount() {
        var allCats = await this.loadCats();
        this.setState({ cats : allCats, number : allCats.length }) 
    }

    async loadCats() {
        const snapshotCats = await cats().get();
        return snapshotCats.docs.map(cat => cat.data());
    }

    render() {
        let { cats, number } = this.state;

        if(number === null) {
            return(
                <div className="stats-container">
                    <p className="information">Chargement des données</p>
                </div>
            )
        }

        if(number !== 0) {
            return (
                <div className="stats-container">
                    {cats.map((cat) => {
                        return <StatsCat cat={cat} key={cat.id} />
                    })}
                </div>
            )
        } else {
            return(
                <div className="stats-container">
                    <p className="information">Pas encore de chats</p>
                </div>
            )
        }
    }
}
