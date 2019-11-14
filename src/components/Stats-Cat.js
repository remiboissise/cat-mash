import React, { Component } from 'react';
import CardCat from './Card-Cat';

export default class StatsCat extends Component {
    render() {
        const { cat } = this.props;
        return (
            <div className="stat-container">
                <CardCat source={cat.url} />
            </div>
        )
    }
}