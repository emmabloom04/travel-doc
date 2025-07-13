import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "./firebase";

import Header from "./components/header";
import Footer from "./components/footer";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import "./styles/travel-doc.css";

// 🔒 PrivateRoute component (v5 style)
function PrivateRoute({ component: Component, ...rest }) {
  const [user, loading] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <p>Loading...</p>
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

// 🏠 Your main homepage wrapped as a component
function HomePage() {
  const [trips, setTrips] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const tripsRef = collection(db, "users", user.uid, "trips");
    const q = query(tripsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripsData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDeleteTrip = async (tripId) => {
  try {
    const tripRef = doc(db, "users", user.uid, "trips", tripId);
    await deleteDoc(tripRef);
    console.log("Trip deleted:", tripId);
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
};

  return (
    <div>
      <Header />
      <main>
        <p className="site-welcome">
          Welcome to your personal travel journal, Travel Doc!
        </p>
        <div className="button-container">
          <button className="sign-out" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </div>
        <TripList trips={trips} onDelete={handleDeleteTrip} />
        {isAdding && <TripForm cancel={() => setIsAdding(false)} />}
        <div className="button-container">
          <button className="new-trip" onClick={() => setIsAdding(true)}>
            Add New Trip
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// 🧠 App handles routing
function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
