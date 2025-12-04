import React from "react";
import "./Person.css";
export default function Stats({ employees }) {
  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0
  );
  const avgSalary =
    employees.length > 0 ? (totalSalary / employees.length).toFixed(2) : 0;
  return (
    <div className="stats-container">
      <h3>Company Salary Stats</h3>
      <div className="stats-cards">
        <div className="stat-card">
          <p>Total Employees</p>
          <h2>{employees.length}</h2>
        </div>
        <div className="stat-card">
          <p>Average Salary (€)</p>
          <h2>{avgSalary}</h2>
        </div>
        <div className="stat-card">
          <p>Total Salary (€)</p>
          <h2>{totalSalary}</h2>
        </div>
      </div>
    </div>
  );
}
