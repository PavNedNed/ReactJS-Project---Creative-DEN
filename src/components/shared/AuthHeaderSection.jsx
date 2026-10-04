function AuthHeaderSection({
    title,
    type,
    paragraph
}) {
    return (
        <section className="page-hero">
          <div className="container" style={{textAlign: "center"}}>
            <span className="section-kicker">{title}</span>
            <h1>{type}</h1>
            <p style={{marginInline: "auto"}}>{paragraph}</p>
          </div>
        </section>
    );
}

export default AuthHeaderSection;

