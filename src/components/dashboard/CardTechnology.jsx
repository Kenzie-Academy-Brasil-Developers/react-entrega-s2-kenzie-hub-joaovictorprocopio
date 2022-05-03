function CardTechnology({ technology, status, onClick }) {
  return (
    <section className="card" onClick={(e) => onClick(e)}>
      <p>{technology}</p>
      <span>{status}</span>
    </section>
  );
}

export default CardTechnology;
