import React, { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function TripForm({ cancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      console.log("Current user:", auth.currentUser);
      await addDoc(collection(db, "users", user.uid, "trips"), {
        title,
        description,
        createdAt: serverTimestamp(),
      });

      // Clear form
      setTitle("");
      setDescription("");

      // Hide form
      cancel();
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="trip-form">
          <h2>Add a new trip</h2>
          <div className="input-container">
            <input
              className="trip-location"
              type="text"
              placeholder="Trip location"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="trip-description"
              placeholder="Trip description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="form-buttons">
            <button className="add-trip" type="submit">
              Add Trip
            </button>
            <button className="cancel" type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripForm;
