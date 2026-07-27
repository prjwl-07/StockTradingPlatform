import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <section className="container py-5 my-4">
      <div className="row align-items-center g-5">
        {/* Product Information */}
        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <div style={{ maxWidth: "500px" }}>
            <h1
              className="fw-semibold mb-4"
              style={{
                fontSize: "2rem",
                color: "#424242",
              }}
            >
              {productName}
            </h1>

            <p
              className="text-muted mb-4"
              style={{
                lineHeight: "1.9",
                fontSize: "1rem",
              }}
            >
              {productDesription}
            </p>

            {learnMore && (
              <a
                href={learnMore}
                className="text-decoration-none fw-medium"
                style={{ color: "#387ed1" }}
              >
                Learn more →
              </a>
            )}
          </div>
        </div>

        {/* Product Image */}
        <div className="col-12 col-lg-6 text-center order-1 order-lg-2">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{
              maxHeight: "450px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default RightSection;
