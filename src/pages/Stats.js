import React from 'react'
import StatsCat from '../components/Stats-Cat';
import { cats, votes } from '../api/Firebase';

export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: null,
            number: null,
            quotaExceededFb: false,
            errorMessage: null
        }
    }

    /**
     * Calcul le score d'un chat en fonction de son nombre d'apparition, de son nombre de like
     * et du nombre total de vote
     * @param {*} totalNumberVotes nombre total de vote
     * @param {*} totalCatDisplay nombre de fois que le chat a été affiché
     * @param {*} catRatio ratio de Match du chat
     */
    catUpdateScore = (totalNumberVotes, totalCatDisplay, catRatio) => {
        return Math.round(((totalCatDisplay / totalNumberVotes) * catRatio) * 100)
    }

    /**
     * Lancée au chargement de notre composant
     */
    async componentDidMount() {
        try {
            var counter = await votes().get();;
            // Si notre compteur de vote n'est pas encore instancié
            if(counter.empty) {
                return this.setState({ cats : null, number : 0 });
            }
            // Si notre compteur de vote est instancié mais qu'il n'y a pas de vote
            if(counter.docs[0].data().count === 0) {
                return this.setState({ cats : null, number : 0 });
            }
            // On va vérifier si un vote a été posté (listener)
            votes().onSnapshot(async (docs) => {
                // On va récupérer l'ensemble de nos chats
                var allCats = await this.loadCats();
                // On va mettre à jour le score des chats et les trier par score
                var allCatsWithScore = allCats.map((cat) => {
                    return { ...cat, score : this.catUpdateScore(docs.docs[0].data().count, cat.display, cat.ratio) }
                }).sort((cat1, cat2) => { return cat2.score - cat1.score });
                // On va mettre à jour l'état
                this.setState({ cats : allCatsWithScore, number : allCatsWithScore.length }) 
            });
        } catch (error) {
            return this.setState({ quotaExceededFb : true, errorMessage: error.message });
        }
    }

    /**
     * Permet de récupérer l'ensemble des chats
     */
    loadCats = async () => {
        const snapshotCats = await cats().get();
        return snapshotCats.docs.map(cat => cat.data());
    }

    render() {
        let { cats, number, errorMessage, quotaExceededFb } = this.state;
        
        if(quotaExceededFb) {
            return(
                <div className="stats-container">
                    <p className="information">{errorMessage}</p>
                </div>
            )
        }

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
