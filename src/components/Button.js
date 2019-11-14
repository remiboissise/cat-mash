import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        const { text, onClick } = this.props;
        return <button className="vote" onClick={() => onClick()}>{text}</button>
    }
}