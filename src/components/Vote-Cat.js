import React, { Component } from 'react';
import Button from './Button';
import CardCat from './Card-Cat';

export default class VoteCat extends Component {
    render() {
        const { imageSrc, buttonText, primaryColor, secondColor } = this.props;
        return (
            <div className="vote-container" style={{ backgroundColor: primaryColor }}>
                <CardCat source={imageSrc} borderColor={secondColor} />
                <Button text={buttonText} primaryColor={primaryColor} secondColor={secondColor}></Button>
            </div>
        )
    }
}