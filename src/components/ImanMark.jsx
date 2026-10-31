// IMAN belgisi (vektor): bitta shakl markaz atrofida 45° dan 8 marta aylantiriladi.
// Rangi currentColor — atrofdagi matn rangini oladi, har qanday o'lchamda tiniq.
const PETAL =
  "M300 156H352Q356 156 356 160V192Q356 204 345 209L333 214Q320 218 309 210Q300 203 300 191Z";

function ImanMark({ size = 24, className, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="104 104 304 304"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={PETAL} transform={`rotate(${i * 45} 256 256)`} />
      ))}
    </svg>
  );
}

export default ImanMark;
