import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Filters</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">End Year:</label>
          <input
            type="text"
            name="end_year"
            value={filters.end_year}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Topic:</label>
          <input
            type="text"
            name="topic"
            value={filters.topic}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Sector:</label>
          <input
            type="text"
            name="sector"
            value={filters.sector}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Region:</label>
          <input
            type="text"
            name="region"
            value={filters.region}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">PEST:</label>
          <input
            type="text"
            name="pestle"
            value={filters.pestle}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Source:</label>
          <input
            type="text"
            name="source"
            value={filters.source}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">SWOT:</label>
          <input
            type="text"
            name="swot"
            value={filters.swot}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            value={filters.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default Filters;
