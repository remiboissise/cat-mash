import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-title">
                    <Link to="/">Catmash</Link>
                </div>
                <div className="navbar-buttons">
                    <Link to="/stats">Classement</Link>
                </div>
            </div>
        );
    }
}