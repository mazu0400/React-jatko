import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("Virhe haussa:", err);
        setError("Virhe datassa");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Ladataan...</div>;
  if (error) return <div>{error}</div>;
  const filteredTodos = employees.filter((todo) => {
    const completedOK =
      filterCompleted === "all"
        ? true
        : filterCompleted === "completed"
        ? todo.completed
        : !todo.completed;
    const userOK = filterUser === "all" ? true : String(todo.id) === filterUser;
    return completedOK && userOK;
  });

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <label>
          Completed:
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not">Not Completed</option>
          </select>
        </label>

        <label>
          User:
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          >
            <option value="all">All</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> {todo.userName} -{" "}
            {todo.completed ? "✔️ Done" : "❌ Not done"}
          </li>
        ))}
      </ul>
    </div>
  );
}
