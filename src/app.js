import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

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

  const addTrip = (newTrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    setIsAdding(false);
  };

  return (
    <div>
      <Header />
      <main>
        <p className="site-welcome">
          Welcome to your personal travel journal, Travel Doc!
        </p>
        <TripList trips={trips} />
        {isAdding && (
          <TripForm addTrip={addTrip} cancel={() => setIsAdding(false)} />
        )}
        <div className="button-container">
          <button className="new-trip" onClick={() => setIsAdding(true)}>
            Add New Trip
          </button>
        </div>
        <div className="button-container">
          <button className="sign-out" onClick={() => auth.signOut()}>
            Sign Out
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
