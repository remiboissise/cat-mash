import React from 'react'
import StatsCat from '../components/Stats-Cat';
import { cats, votes } from '../api/Firebase';

export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: null,
            number: null
        }
    }

    catsUpdateScore = async (totalNumberVotes) => {
        const snapshotCats = await cats().get();
        snapshotCats.docs.map((cat) => {
            cats().doc(cat.id).update({ 
                score : this.catUpdateScore(totalNumberVotes, cat.data().display, cat.data().ratio) 
            });
        });
    } 

    /**
     * Calcul le score d'un chat en fonction de son nombre d'apparition, de son nombre de like
     * et du nombre total de vote
     */
    catUpdateScore = (totalNumberVotes, totalCatDisplay, catRatio) => {
        return Math.round(((totalCatDisplay / totalNumberVotes) * catRatio) * 100)
    }

    // On va mettre à jour les scores

    async componentDidMount() {
        var counter = await votes().get();
        if(counter.empty) {
            return this.setState({ cats : null, number : 0 });
        }
        await this.catsUpdateScore(counter.docs[0].data().count);
        var allCats = await this.loadCats();
        this.setState({ cats : allCats, number : allCats.length }) 
    }

    loadCats = async () => {
        const snapshotCats = await cats().orderBy('score', 'desc').get();
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
                    {cats.map((cat, index) => {
                        return <StatsCat cat={cat} key={cat.id} number={index+1} />
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
