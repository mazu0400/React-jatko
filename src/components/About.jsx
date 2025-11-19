import "/src/components/About.css";
export default function About() {
  return (
    <div className="about-container">
      <div className="about-container-box">
        <h2>About This App</h2>
        <p>This HR app helps manage employee information easily.</p>
        <p>
          Easily manage employee data, track working years, and see salary
          distributions.
        </p>
      </div>
      <div className="about-separator">
        <h3>Main Features</h3>
        <ul>
          <li>Add, view, and delete employees</li>
          <li>Track years worked and schedule reminders</li>
          <li>View salary statistics and distributions</li>
          <li>Maintain employee skills, departments, and locations</li>
        </ul>
      </div>
      <div className="about-separators">
        <h3>Future Improvements</h3>
        <ul>
          <li>Export data to Excel / CSV</li>
          <li>Advanced salary analytics</li>
          <li>Employee performance tracking</li>
          <li>User authentication & role management</li>
        </ul>
      </div>
      <div className="about-contact">
        <h3>Contact </h3>
        <ul>
          <li>Puh: 0408013606</li>
          <li>Mail: Joku.p@gmail.com</li>
          <li>Instagram: Tyven_Tattoo</li>
          <li>Location: Krarhurantatie 12 00940 Helsinki</li>
        </ul>
      </div>
    </div>
  );
}
