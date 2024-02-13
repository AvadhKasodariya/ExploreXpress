import "./featuredProperties.css";

const FeaturedProperties = () => {
  return (
    <div className="featured-properties">
      <div className="featured-property">
        <img
          src="https://images.trvl-media.com/lodging/1000000/20000/14900/14807/3f8310cd.jpg?impolicy=resizecrop&rw=1200&ra=fit"
          alt="Placeholder"
          className="featured-property-img"
        />
        <span className="featured-property-name">Luxury Suites</span>
        <span className="featured-property-city">Paris</span>
        <span className="featured-property-price">Starting from $400</span>
        <div className="featured-property-rating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="featured-property">
        <img
          src="https://images.trvl-media.com/lodging/2000000/1200000/1198400/1198396/474cf538.jpg?impolicy=resizecrop&rw=1200&ra=fit"
          alt="Placeholder"
          className="featured-property-img"
        />
        <span className="featured-property-name">Royal Residences</span>
        <span className="featured-property-city">Dubai</span>
        <span className="featured-property-price">Starting from $800</span>
        <div className="featured-property-rating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="featured-property">
        <img
          src="https://images.trvl-media.com/lodging/92000000/91520000/91518100/91518086/6a98b4e6.jpg?impolicy=resizecrop&rw=1200&ra=fit"
          alt="Placeholder"
          className="featured-property-img"
        />
        <span className="featured-property-name">Historic Mansions</span>
        <span className="featured-property-city">Rome</span>
        <span className="featured-property-price">Starting from $999</span>
        <div className="featured-property-rating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="featured-property">
        <img
          src="https://media-cdn.holidaycheck.com/w_768,h_432,c_fill,q_auto,f_auto/ugc/images/65a44561-0cb1-4488-8021-49207110021c"
          alt="Placeholder"
          className="featured-property-img"
        />
        <span className="featured-property-name">City Retreats</span>
        <span className="featured-property-city">Berlin</span>
        <span className="featured-property-price">Starting from $600</span>
        <div className="featured-property-rating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
