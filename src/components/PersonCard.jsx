import React, { useState } from "react";
import axios from "axios";
import "./PersonCard.css";

export default function PersonCard({ employee, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    salary: employee.salary,
    location: employee.location,
    department: employee.department,
    skills: employee.skills.join(", "),
    completed: employee.completed || false,
  });

  const start = new Date(employee.startDate);
  const yearsWorked = (new Date() - start) / (1000 * 60 * 60 * 24 * 365);

  const animalEmojis = {
    Owl: "🦉",
    Dog: "🐶",
    Cat: "🐱",
    Fox: "🦊",
    Bear: "🐻",
    Tiger: "🐯",
    Parrot: "🦜",
  };
  const animalEmoji = animalEmojis[employee.animal] || "🐾";
  const status = employee.completed ? "✔️ Done" : "❌ Not done";

  const handleSave = async () => {
    try {
      const updatedEmployee = {
        salary: Number(formData.salary),
        location: formData.location,
        department: formData.department,
        skills: formData.skills.split(",").map((s) => s.trim()),
        completed: formData.completed,
      };

      const res = await axios.patch(
        `https://hrapp-backend-u8iq.onrender.com/employees/${employee.id}`,
        updatedEmployee
      );

      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("PATCH ERROR", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      salary: employee.salary,
      location: employee.location,
      department: employee.department,
      skills: employee.skills.join(", "),
    });

    setIsEditing(false);
  };

  return (
    <div className="person-card">
      <h2>
        {employee.name} {animalEmoji}
      </h2>
      <p>
        <strong>Title:</strong> {employee.title}
      </p>

      {isEditing ? (
        <>
          <label>
            <strong>Salary:</strong>
          </label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
          />

          <label>
            <strong>Location:</strong>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <label>
            <strong>Department:</strong>
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />

          <label>
            <strong>Skills:</strong>
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
          {isEditing && (
            <label>
              <strong> Status:</strong>
              <select
                value={formData.completed ? "completed" : "not_completed"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    completed: e.target.value === "completed",
                  })
                }
              >
                <option value="completed">Completed</option>
                <option value="not_completed">Not Done</option>
              </select>
            </label>
          )}

          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>Salary:</strong> €{employee.salary}
          </p>
          <p>
            <strong>Phone:</strong> {employee.phone}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Start Date:</strong> {employee.startDate}
          </p>
          <p>
            <strong>Years Worked:</strong> {yearsWorked.toFixed(1)} years
          </p>
          <p>
            <strong>Location:</strong> {employee.location}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
          <p>
            <strong>Skills:</strong> {employee.skills.join(", ")}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>

          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
        </>
      )}

      {onDelete && (
        <button onClick={() => onDelete(employee.id)} className="delete-btn">
          Delete
        </button>
      )}
    </div>
  );
}
