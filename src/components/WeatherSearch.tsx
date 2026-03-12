type WeatherSearchProps = {
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function WeatherSearch({
  handleSubmit,
  handleCityChange,
  handleLocation,
}: WeatherSearchProps) {
  return (
    <form onSubmit={handleSubmit} className="p-2">
      {/* Search input */}
      <div className="flex items-center gap-2 bg-secondary p-2 rounded-xl border border-white/10">
        {/* Magnifying glass */}
        <div className="p-2 hover:bg-white/5 rounded-lg transition-colors text-primary-text-dim hover:text-white hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="search"
          placeholder="Search for a city!"
          className="bg-transparent border-none outline-none grow text-primary-text placeholder:text-secondary-text-dim text-base"
          autoFocus
          onChange={handleCityChange}
        />

        {/* Location button */}
        <button
          type="button"
          onClick={handleLocation}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-primary-text-dim hover:text-white hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
