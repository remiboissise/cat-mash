

import React, { Component } from 'react';

export default class CardCat extends Component {
    render() {
        const { source, borderColor } = this.props;
        return <img src={source}/>
    }
}