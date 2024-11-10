import React from 'react';
import './LandingPage.css';
import spotifyLogo from './spotify-logo.png'; // Spotify logo image


const LandingPage = ({ onConnect }) => {
    return (
        <div className="landing-page">
            <div className="container">
                <h1 className="title">
                    <div>YOUR</div>
                    <div>SPOTIFY</div>
                    <div>OUTFIT</div>
                </h1>
                <p className="subtitle">Your outfit, inspired by your music taste</p>
                <button className="connect-button" onClick={onConnect}>
                    <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
                    CONNECT SPOTIFY
                </button>
            </div>
        </div>
    );
};

export default LandingPage;