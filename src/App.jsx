import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonList from "./components/personlist";
import AddEmployee from "./components/AddEmployee";
import About from "./components/About";
import Todos from "./components/Todos";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://hrapp-backend-u8iq.onrender.com/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Virhe haettaessa työntekijöitä:", err));
  }, []);

  const handleAddEmployee = (newEmployee) => {
    axios
      .post("https://hrapp-backend-u8iq.onrender.com/employees", newEmployee)
      .then((res) => setEmployees((prev) => [...prev, res.data]))
      .catch((err) => console.error("Virhe lisättäessä työntekijää:", err));
  };
  const handleUpdateEmployee = (updated) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
  };

  const handleDeleteEmployee = (id) => {
    console.log("Poistetaan ID:", id);
    const confirmed = window.confirm(
      "Haluatko varmasti poistaa tämän työntekijän?"
    );
    if (confirmed) {
      axios
        .delete(`https://hrapp-backend-u8iq.onrender.com/employees/${id}`)
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
                onUpdate={handleUpdateEmployee}
              />
            }
          />
          <Route
            path="/add"
            element={<AddEmployee onAddEmployee={handleAddEmployee} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
