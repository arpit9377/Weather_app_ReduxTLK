// Main.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../redux/weatherSlice';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const weatherData = useSelector((state) => state.weather.data);
  const isLoading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const selectedCity = useSelector((state) => state.weather.city);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSearch = () => {
    dispatch(fetchWeatherData(city));
  };

  const formatDate = (datetime) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = new Date(datetime).toLocaleDateString(undefined, options);
    return formattedDate === 'Invalid Date' ? datetime : formattedDate;
  };

  return (
    <>
      <div
        className="d-flex flex-column vh-100 justify-content-center align-items-center"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source
            src={process.env.PUBLIC_URL + '/assets/pexels-yaroslav-shuraev-5976563 (720p).mp4'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="p-3 bg-transparent rounded">
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control rounded"
              style={{
                width: '600px',
                backgroundColor: 'transparent',
                border: '3px solid #ced4da',
              }}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="button" className="btn btn-outline-primary ms-2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="position-absolute top-0 end-0 m-3">
          <button type="button" className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {weatherData && weatherData.data && (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="card p-3 mb-3 bg-transparent" style={{ width: '400px' }}>
              <h5 className="card-title">Current Weather</h5>
              <p className="card-text">City: {selectedCity}</p>
              <p className="card-text">Temperature: {weatherData.data[0].temp}°C</p>
              <p className="card-text">
                Weather Description: {weatherData.data[0].weather.description}
              </p>
            </div>

            {/* Forecast for the next 5 days */}
            <div className="d-flex justify-content-between">
              {weatherData.data.slice(1, 6).map((day) => (
                <div key={day.ob_time} className="card p-3 mb-3 bg-transparent mt-3 ml-3" style={{ width: '150px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                  <h6 className="card-title">{formatDate(day.ob_time)}</h6>
                  <p className="card-text">Temperature: {day.temp}°C</p>
                  <p className="card-text">Weather: {day.weather.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
