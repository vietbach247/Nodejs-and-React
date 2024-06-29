import React from "react";

const NotFound = () => {
  return (
    <>
      <main className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <p className="display-1 text-primary">404</p>
          <h1 className="mt-4 display-4 fw-bold text-dark">Page not found</h1>
          <p className="mt-4 lead text-secondary">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-5">
            <a href="/" className="btn btn-primary btn-lg me-3" role="button">
              Go back home
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Contact support <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
