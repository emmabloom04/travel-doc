import React from "react";

function TripList({ trips, onDelete }) {
  return (
    <div className="trip-list">
      {trips.length === 0 ? (
        <p className="no-trip">No trips added yet!</p>
      ) : (
        trips.map((trip, index) => (
          <div key={index} className="trip-card">
            <h3 className="trip-card-title">{trip.title}</h3>
            <p className="trip-card-description">{trip.description}</p>
            {trip.createdAt?.toDate && (
              <p className="timestamp">
                Created: {trip.createdAt.toDate().toLocaleString()}
              </p>
            )}
            <button className="delete" onClick={() => onDelete(trip.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TripList;
