import React, { Component } from 'react';
import CardCat from './Card-Cat';

export default class StatsCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    hoverOn = () => {
        this.setState({ hover: true });
    }

    hoverOff = () => {
        this.setState({ hover: false });
    }

    render() {
        const { cat, number } = this.props;
        const { hover } = this.state;
        return (
            <div className="stat-container">
                <span className="classement" style={{background: `linear-gradient(to top, #8bd3fb ${cat.score}%, #ffffff ${cat.score}%)`}} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                    { hover ? `${cat.score}%` : number }
                </span>
                <CardCat source={cat.url} />
            </div>
        )
    }
}