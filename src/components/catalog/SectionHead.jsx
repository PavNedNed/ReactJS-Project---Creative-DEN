function SectionHead({
  kicker,
  title,
  paragraph,
}) {
    return (
        <section className="page-hero">
          <div className="container">
            <span className="section-kicker">{kicker}</span>
            <h1>{title}</h1>
            <p>{paragraph}</p>
          </div>
        </section>
    );
}

export default SectionHead;