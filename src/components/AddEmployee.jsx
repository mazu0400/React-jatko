import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

export default function AddEmployee({ onAddEmployee }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",
    location: "",
    department: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    onAddEmployee(newEmployee);
    navigate("/");
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required={key === "name" || key === "email"}
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
