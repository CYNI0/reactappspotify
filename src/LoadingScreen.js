import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const loadingMessages = [
        { text: "Loading up your profile...", color: "#fff4bd" },
        { text: "Analyzing your music taste...", color: "#fff4bd" },
        { text: "Stitching up your outfit...", color: "#fff4bd" }
    ];

    const [loadingStage, setLoadingStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStage(prev => (prev + 1) % loadingMessages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-screen">
            {loadingMessages.map((message, index) => (
                <p
                    key={index}
                    className={`loading-line ${loadingStage === index ? 'fade-in' : 'fade-out'}`}
                    style={{ 
                        color: message.color,
                    }}
                >
                    {message.text}
                </p>
            ))}
        </div>
    );
};

export default LoadingScreen;