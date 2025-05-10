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
                <p>Welcome to your personal travel journal, Travel Doc!</p>
                <button onClick={() => setIsAdding(true)}>Add Trip</button>
                <TripList trips={trips} />
            </main>
            {isAdding && (
                <TripForm addTrip={addTrip} cancel={() => setIsAdding(false)} />
            )}
            <Footer />
        </div>
    )
}

export default App;