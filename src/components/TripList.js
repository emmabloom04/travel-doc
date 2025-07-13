import React from 'react';

function TripList({ trips }) {
    return (
       <div className="trip-list">
          {trips.length === 0 ? (
             <p className="no-trip">No trips added yet!</p>
          ) : (
             trips.map((trip, index) => (
                <div key={index} className="trip-card">
                   <h3>{trip.title}</h3>
                   <p>{trip.description}</p>
                </div>
             ))
          )}
       </div>
    );
 }

 export default TripList;