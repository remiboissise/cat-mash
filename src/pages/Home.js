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
        var counter = await this.voteCounterIncrement();
        console.log('counter', counter.data().count);
        // On va récupérer les informations du chat sélectionné
        var chosenCatFbDocument = await this.catRecovery(chosenCat);
        var chosenCatData = chosenCatFbDocument.data();
        // On va récupérer les informations du chat qui n'a pas été séléctionné
        var catNotChosenFbDocument = await this.catRecovery(catNotChosen);
        var catNotChosenFbData = catNotChosenFbDocument.data();
        // On va modifier les informations du chat séléctionné (on va incrémenter le nombre de fois où il est apparu et son nombre de vote)
        await cats().doc(chosenCatFbDocument.id).update({ 
            display: chosenCatData.display + 1, 
            vote: chosenCatData.vote + 1,
            ratio: this.catCalculateRatio(chosenCatData.display + 1, chosenCatData.vote + 1)
        });
        // On va modifier les informations du chat qui n'a pas été séléctionné (on va incrémenter le nombre de fois où il est apparu)
        await cats().doc(catNotChosenFbDocument.id).update({ 
            display: catNotChosenFbData.display + 1,
            ratio: this.catCalculateRatio(catNotChosenFbData.display + 1, catNotChosenFbData.vote)
        });
        // On va afficher deux nouveaux chats
        let firstCat = this.randomCat(Cats);
        let secondCat = this.randomCat(Cats, firstCat);
        this.setState({
            firstCat: firstCat,
            secondCat: secondCat
        });
        // On va mettre à jour les scores
        this.catsUpdateScore(counter.data().count + 1)
    }

    catCalculateRatio = (totalCatDisplay, totalCatVote) => {
        if(totalCatVote === 0) {
            return 0
        } else {
            return totalCatDisplay / totalCatVote;
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
        var calcul = Math.round(((totalCatDisplay / totalNumberVotes) * catRatio) * 100)
        return calcul;
    }

    voteCounterIncrement = async () => {
        var counter = await votes().get();
        if(!counter.empty) {
            votes().doc(counter.docs[0].id).update({ count : counter.docs[0].data().count + 1 });
            return counter.docs[0];
        } else {
            let voteAdd = await votes().add({
                count: 1
            });
            return voteAdd.get();
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
            vote: 0,
            ratio: 0
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
