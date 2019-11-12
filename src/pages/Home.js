import React from 'react'
import VoteCat from '../components/Vote-Cat';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-container">
                <VoteCat imageSrc = "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" 
                    buttonText="Coucou"
                    primaryColor="black" 
                    secondColor="red"
                />
                <VoteCat imageSrc = "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" 
                    buttonText="Coucou"
                    primaryColor="black" 
                    secondColor="red"
                />
            </div>
        )
    }
}
