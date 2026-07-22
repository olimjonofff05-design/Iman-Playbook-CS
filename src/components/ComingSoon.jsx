import "./ComingSoon.css";

function ComingSoon({ icon, title, note }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-icon">{icon}</div>
      <h1>{title}</h1>
      <p>{note || "Bu bo'lim tez orada ma'lumotlar bilan to'ldiriladi."}</p>
    </div>
  );
}

export default ComingSoon;
