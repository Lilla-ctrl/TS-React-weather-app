type WeatherSearchProps = {
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export default function WeatherSearch({
  handleSubmit,
  handleCityChange,
  handleLocation,
}: WeatherSearchProps) {
  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {/* Search input row */}
      <div className="row g-2">
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
          <input
            type="search"
            placeholder="Enter a city!"
            className="form-control"
            autoFocus
            onChange={handleCityChange}
          />
        </div>
      </div>

      {/* Buttons row */}
      <div>
        <div className="row mt-3">
          <div className="col-6 col-md-3 mb-2 mb-md-0">
            <input
              type="submit"
              value="Search"
              className="btn btn-secondary w-100"
            />
          </div>
          <div className="col-6 col-md-3">
            <input
              type="button"
              value="Location"
              className="btn btn-secondary w-100"
              onClick={handleLocation}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
