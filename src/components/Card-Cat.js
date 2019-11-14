

import React, { Component } from 'react';

export default class CardCat extends Component {
    render() {
        const { source } = this.props;
        return (
            <>
                <div className="image-container">
                    <div className="background-blur" style={{ backgroundImage : `url(${source})` }}></div>
                    <img src={source} />
                </div>
            </>
        )
    }
}