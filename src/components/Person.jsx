import "./Person.css";

export default function Person({ employee, onDelete }) {
  return (
    <div className="person-card">
      <h3>{employee.name}</h3>
      <p>
        <strong>Title:</strong> {employee.title}
      </p>
      <p>
        <strong>Salary:</strong> ${employee.salary}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Skills:</strong> {employee.skills.join(", ")}
      </p>

      <button className="delete-btn" onClick={() => onDelete(employee.id)}>
        Poista
      </button>
    </div>
  );
}
