import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Features.css';

const Features = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="features">
      <h2>Our Features</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list"
        itemClass="carousel-item"
      >
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80" alt="Smart Farming" />
          </div>
          <div className="feature-content">
            <h3>Smart Farming</h3>
            <p>Advanced technology integration for modern agriculture</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80" alt="Crop Management" />
          </div>
          <div className="feature-content">
            <h3>Crop Management</h3>
            <p>Efficient solutions for crop monitoring and maintenance</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80" alt="Cost & Profit Optimization" />
          </div>
          <div className="feature-content">
            <h3>Cost & Profit Optimization</h3>
            <p>Smart analytics to maximize farm profitability</p>
          </div>
        </div>
        {/* Market Access card removed */}
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80" alt="Expert Support" />
          </div>
          <div className="feature-content">
            <h3>Expert Support</h3>
            <p>24/7 agricultural expert consultation</p>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Features;