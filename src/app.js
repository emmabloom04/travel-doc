import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import './styles/travel-doc.css';

function App() {
    const [trips, setTrips] = useState([]);
    const [isAdding, setIsAdding] = useState(false)

    const addTrip = (newTrip) => {
        setTrips((prevTrips) => [...prevTrips, newTrip]);
        setIsAdding(false)
    }

    return(
        <div>
            <Header />
            <main>
                <p className="site-welcome">Welcome to your personal travel journal, Travel Doc!</p>
                <TripList trips={trips} />
                {isAdding && (
                <TripForm addTrip={addTrip} cancel={() => setIsAdding(false)} />
                )}
                <div className="button-container">
                    <button className="new-trip" onClick={() => setIsAdding(true)}>Add New Trip</button>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default App;