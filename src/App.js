import Navigation from "./components/pages/Navegation";

import { useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Navigation setUser={setUser} user={user} />
    </div>
  );
}

export default App;
