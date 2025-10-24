// src/App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Person from "./components/Person";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Person
          name="Matias"
          title="HR Manager"
          salary="5000"
          phone="040-1234567"
          email="matias@example.com"
          animal="Dog"
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
