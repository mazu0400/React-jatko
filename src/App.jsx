import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonList from "./components/personlist";
import AddEmployee from "./components/AddEmployee";
import About from "./components/About";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Virhe haettaessa työntekijöitä:", err));
  }, []);

  const handleAddEmployee = (newEmployee) => {
    axios
      .post("http://localhost:3001/employees", newEmployee)
      .then((res) => setEmployees((prev) => [...prev, res.data]))
      .catch((err) => console.error("Virhe lisättäessä työntekijää:", err));
  };
  const handleDeleteEmployee = (id) => {
    const confirmed = window.confirm(
      "Haluatko varmasti poistaa tämän työntekijän?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:3001/employees/${id}`)
        .then(() => setEmployees((prev) => prev.filter((emp) => emp.id !== id)))
        .catch((err) => console.error("Virhe poistettaessa työntekijää:", err));
    }
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PersonList
                employees={employees}
                onDelete={handleDeleteEmployee}
              />
            }
          />
          <Route
            path="/add"
            element={<AddEmployee onAddEmployee={handleAddEmployee} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
