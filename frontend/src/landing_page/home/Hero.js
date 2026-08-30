import React from "react";

function Hero() {
  return (
    <section className="container hero-section">
      <img
        src="/media/images/homeHero.png"
        alt="Investment platform"
        className="hero-image"
      />

      <h1>Invest in everything</h1>

      <p>
        Online platform to invest in stocks, derivatives, mutual funds, and more
      </p>

      <button className="signup-btn">Sign up now</button>
    </section>
  );
}

export default Hero;
