import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import LoadingScreen from './LoadingScreen';
import ResultsPage from './ResultsPage';
import './App.css'; // Optional: Import your global styles if you have any
import { loginUrl, getTokenFromUrl } from './Auth'; // Spotify Auth

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [genre, setGenre] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [token, setToken] = useState(null);

    // Handle Spotify authentication redirect
    useEffect(() => {
        const hash = getTokenFromUrl();
        const _token = hash.access_token;
        if (_token) {
            setToken(_token);
            setIsLoading(true);
            window.location.hash = ""; // Clear the hash from the URL for cleaner UX
        } else {
            console.warn("No access token found in URL. Please log in.");
        }
    }, []);

    useEffect(() => {
        if (!token) {
            console.warn("Token not available. Please check authentication.");
            return;
        }
    
        const fetchUserData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Fetch failed with status ${response.status}: ${errorText}`);
                    
                    // Specific handling for restricted accounts
                    if (response.status === 403) {
                        setGenre('Account may have restricted access');
                        setArtistImage('');
                        return;
                    }
    
                    throw new Error(`Error ${response.status}: Unable to fetch data. ${errorText}`);
                }
    
                const data = await response.json();
                console.log("Fetched data:", data);
    
                if (data.items && data.items.length > 0) {
                    const topArtist = data.items[0];
                    const topGenre = topArtist.genres && topArtist.genres.length > 0 
                        ? topArtist.genres[0].toUpperCase() 
                        : 'No genre available';
                    const artistImageUrl = topArtist.images[0]?.url || '';
    
                    console.log("Top artist genre:", topGenre);
                    setGenre(topGenre);
                    setArtistImage(artistImageUrl);
                } else {
                    setGenre('No top artists found');
                    setArtistImage('');
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setGenre('Error fetching data');
                setArtistImage('');
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 9000);
            }
        };
    
        fetchUserData();
    }, [token]);
    

    const handleConnect = () => {
        window.location.href = loginUrl;
    };

    return (
        <div className="App">
            {isLoading ? (
                <LoadingScreen />
            ) : genre ? (
                <ResultsPage genre={genre} artistImage={artistImage} />
            ) : (
                <LandingPage onConnect={handleConnect} />
            )}
        </div>
    );
}

export default App;
