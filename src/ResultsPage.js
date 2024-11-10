import React from 'react';
import './ResultsPage.css';
import outfitImage from './outfit-placeholder.png'; // Placeholder for the outfit image

const ResultsPage = ({ genre, artistImage }) => {
    return (
        <div className="results-page">
            <div className="results-container">
                <h1 className="main-genre">Your main genre is...</h1>
                <h2 className="genre">{genre}</h2>
                {artistImage && (
                    <div className="artist-container">
                        <h3 className="artist-title">Your Top Artist:</h3>
                        <img src={artistImage} alt="Top Artist" className="artist-image" />
                    </div>
                )}
                <h3 className="outfit-title">Here is your outfit!</h3>
                <img src={outfitImage} alt="Outfit" className="outfit-image" />
            </div>
        </div>
    );
};

export default ResultsPage;