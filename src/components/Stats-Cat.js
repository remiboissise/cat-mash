import React, { Component } from 'react';
import CardCat from './Card-Cat';

export default class StatsCat extends Component {
    render() {
        const { cat, number } = this.props;
        return (
            <div className="stat-container">
                <span className="classement" style={{background: `linear-gradient(to top, #8bd3fb ${cat.score}%, #ffffff ${cat.score}%)`}}>
                    {number}
                </span>
                <CardCat source={cat.url} />
            </div>
        )
    }
}