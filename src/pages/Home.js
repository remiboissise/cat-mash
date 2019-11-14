import React from 'react'
import VoteCat from '../components/Vote-Cat';
import { cats, votes } from '../api/Firebase';
import * as Cats from '../data/cats';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        // Récupération de notre premier chat
        let firstCat = this.randomCat(Cats, null);
        // Récupération de notre second chat (différent du premier)
        let secondCat = this.randomCat(Cats, firstCat);
        this.state = {
            firstCat: firstCat,
            secondCat: secondCat
        }
    }

    /**
     *  Récupère un chat aléatoirement
     * @param {*} cats array of cats 
     */
    randomCat = (cats, except) => {
        let cat = cats[Math.floor(Math.random() * cats.length)];
        return (cat === except) ? this.randomCat(cats, except) : cat; 
    }

    /**
     * Cette fonction permet de récupérer le chat pour lequel on a voté
     * @param {*} cat cat 
     */
    handleVote = async (chosenCat, catNotChosen) => {
        // On va récupérer le nombre de votes
        await this.voteCounterIncrement();
        // On va récupérer les informations du chat sélectionné
        var chosenCatFb = await this.catRecovery(chosenCat);
        // On va récupérer les informations du chat qui n'a pas été séléctionné
        var catNotChosenFb = await this.catRecovery(catNotChosen);
        // On va modifier les informations du chat séléctionné (on va incrémenter le nombre de fois où il est apparu et son nombre de vote)
        cats().doc(chosenCatFb.id).update({ display : chosenCatFb.data().display + 1, vote : chosenCatFb.data().vote + 1 });
        // On va modifier les informations du chat qui n'a pas été séléctionné (on va incrémenter le nombre de fois où il est apparu)
        cats().doc(catNotChosenFb.id).update({ display : catNotChosenFb.data().display + 1 });
        // On va afficher deux nouveaux chats
        let firstCat = this.randomCat(Cats);
        let secondCat = this.randomCat(Cats, firstCat);
        this.setState({
            firstCat: firstCat,
            secondCat: secondCat
        })
    }

    voteCounterIncrement = async () => {
        var counter = await votes().get();
        if(!counter.empty) {
            votes().doc(counter.docs[0].id).update({ count : counter.docs[0].data().count + 1 })
        } else {
            votes().add({
                count: 1
            });
        }
    }

    catRecovery = async (cat) => {
        var catExist = await cats().where('id', '==', cat.id).get();
        if(catExist.size !== 0) {
            return catExist.docs[0];
        } else {
            return this.catRegistration(cat);
        }
    }

    catRegistration = async (cat) => {
        var catAdd = await cats().add({
            id: cat.id,
            url: cat.url,
            display: 0,
            vote: 0
        });
        return await catAdd.get();
    }

    render() {
        return (
            <div className="home-container">
                <VoteCat imageSrc = {this.state.firstCat.url} 
                    buttonText="So cute"
                    primaryColor="black" 
                    secondColor="red"
                    onClick={() => this.handleVote(this.state.firstCat, this.state.secondCat)}
                />
                <VoteCat imageSrc = {this.state.secondCat.url} 
                    buttonText="So pretty"
                    primaryColor="black" 
                    secondColor="red"
                    onClick={() => this.handleVote(this.state.secondCat, this.state.firstCat)}
                />
            </div>
        )
    }
}
