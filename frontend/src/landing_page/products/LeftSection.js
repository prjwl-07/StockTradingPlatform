import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <section className="container py-5 my-4">
      <div className="row align-items-center g-5">
        {/* Product Image */}
        <div className="col-12 col-lg-6 text-center">
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

        {/* Product Information */}
        <div className="col-12 col-lg-6">
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

            {/* Links */}
            <div className="d-flex gap-5 mb-4">
              {tryDemo && (
                <a
                  href={tryDemo}
                  className="text-decoration-none fw-medium"
                  style={{ color: "#387ed1" }}
                >
                  Try demo →
                </a>
              )}

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

            {/* App Download Buttons */}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              {googlePlay && (
                <a href={googlePlay}>
                  <img
                    src="/media/images/googlePlayBadge.svg"
                    alt="Get it on Google Play"
                    style={{ height: "42px" }}
                  />
                </a>
              )}

              {appStore && (
                <a href={appStore}>
                  <img
                    src="/media/images/appstoreBadge.svg"
                    alt="Download on the App Store"
                    style={{ height: "42px" }}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;
