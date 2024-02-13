import "./propertyList.css";

const PropertyList = () => {
  return (
    <div className="property-list">
      <div className="property-list-item">
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/09/Tourism-Types-Adventure_Tourism.webp"
          alt="Adventure Tourism"
          className="property-list-img"
        />
        <div className="property-list-titles">
          <h3>Adventure Tourism</h3>
          <p>Discover thrilling adventures</p>
        </div>
      </div>
      <div className="property-list-item">
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/09/Tourism-Types-Cultural_Tourism.webp"
          alt="Cultural Tourism"
          className="property-list-img"
        />
        <div className="property-list-titles">
          <h3>Cultural Tourism</h3>
          <p>Explore rich cultural heritage</p>
        </div>
      </div>
      <div className="property-list-item">
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/09/Tourism-Types-Atomic_Tourism.webp"
          alt="Atomic Tourism"
          className="property-list-img"
        />
        <div className="property-list-titles">
          <h3>Atomic Tourism</h3>
          <p>Discover atomic history</p>
        </div>
      </div>
      <div className="property-list-item">
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/09/Tourism-Types-Business_Tourism.webp"
          alt="Business Tourism"
          className="property-list-img"
        />
        <div className="property-list-titles">
          <h3>Business Tourism</h3>
          <p>Conduct meetings and conferences</p>
        </div>
      </div>
      <div className="property-list-item">
        <img
          src="https://colorwhistle.com/wp-content/uploads/2019/09/Tourism-Types-Camping.webp"
          alt="Camping"
          className="property-list-img"
        />
        <div className="property-list-titles">
          <h3>Camping</h3>
          <p>Experience the great outdoors</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
