import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="search-item">
      <img
        src="https://via.placeholder.com/150"
        alt="Tower Street Apartments"
        className="si-img"
      />
      <div className="si-desc">
        <h2 className="si-title">Example Hotel</h2>
        <span className="si-distance">500m from city center</span>
        <span className="si-taxi-op">Free shuttle service</span>
        <span className="si-subtitle">Luxury Room with City View</span>
        <span className="si-features">
          Private room • 1 king bed • Free WiFi
        </span>
        <span className="si-cancel-op">Flexible cancellation</span>
        <span className="si-cancel-op-subtitle">
          Cancel for free until 24 hours before check-in.
        </span>
      </div>
      <div className="si-details">
        <div className="si-rating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="si-detail-texts">
          <span className="si-price">$200</span>
          <span className="si-tax-op">Includes taxes and fees</span>
          <button className="si-check-button">Check Availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
