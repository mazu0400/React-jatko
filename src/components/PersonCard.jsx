import React from "react";
import "./PersonCard.css";

export default function PersonCard({ employee, onDelete }) {
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
  let message = "";
  if (Math.abs(yearsWorked - 5) < 0.5 || Math.abs(yearsWorked - 10) < 0.5) {
    message = "🎉 Schedule recognition meeting.";
  } else if (yearsWorked < 0.5) {
    message = "🔔 Schedule probation review.";
  }

  return (
    <div className="person-card">
      <h2>
        {employee.name} {animalEmoji}
      </h2>
      <p>
        <strong>Title:</strong> {employee.title}
      </p>
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

      {message && <p className="reminder">{message}</p>}

      {onDelete && (
        <button onClick={() => onDelete(employee.id)} className="delete-btn">
          Delete
        </button>
      )}
    </div>
  );
}
