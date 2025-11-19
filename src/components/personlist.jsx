import { useRef, useState, useEffect } from "react";
import PersonCard from "./PersonCard";
import "./Person.css";
import Stats from "./Stats";

export default function PersonList({ employees, onDelete, onUpdate }) {
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPos(scrollRef.current.scrollLeft);
      }
    };
    const current = scrollRef.current;
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      <section className="intro-section">
        <h2>Welcome to HR App</h2>
        <p>
          Manage your employees efficiently. Add, view, and delete employees
          easily.
        </p>
      </section>

      <section className="employees-section">
        <h3>All Employees</h3>
        <div className="scroll-container" ref={scrollRef}>
          {employees.map((emp, index) => {
            const overlap = index === 0 ? 0 : Math.min(scrollPos, index * 60);
            return (
              <div
                key={emp.id}
                className="person-card-wrapper"
                style={{
                  transform: `translateX(-${overlap}px)`,
                  zIndex: employees.length - index,
                }}
              >
                <PersonCard
                  employee={emp}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="stats-section">
        <Stats employees={employees} />
      </section>
    </div>
  );
}
