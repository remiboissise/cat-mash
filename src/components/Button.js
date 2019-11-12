import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        const { text, textColor, backgroundColor } = this.props;
        console.log(text, textColor, backgroundColor)
        return <button className="vote" style={{ backgroundColor: backgroundColor, color: textColor, borderColor: backgroundColor }}>{text}</button>
    }
}