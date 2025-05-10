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
                   <div className="image-box">
                     {trip.images && trip.images.map((img, idx) => (
                     <img
                           key={idx}
                           src={img}
                           alt={`${trip.title} ${idx + 1}`}
                           className="trip-image"
                        />
                     ))}
                   </div>
                   <p>{trip.description}</p>
                </div>
             ))
          )}
       </div>
    );
 }

 export default TripList;