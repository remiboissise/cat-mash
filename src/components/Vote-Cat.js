import React, { Component } from 'react';
import Button from './Button';
import CardCat from './Card-Cat';

export default class VoteCat extends Component {
    render() {
        const { imageSrc, buttonText, onClick } = this.props;
        return (
            <div className="vote-container">
                <CardCat source={imageSrc} />
                <Button text={buttonText} onClick={onClick}></Button>
            </div>
        )
    }
}