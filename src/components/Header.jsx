import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Employee</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
