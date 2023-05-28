import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-login.css';

interface Availability {
  monday: boolean[];
  tuesday: boolean[];
  wednesday: boolean[];
  thursday: boolean[];
  friday: boolean[];
  saturday: boolean[];
  sunday: boolean[];
}

const AvailabilityPage: React.FC = () => {
  const navigate = useNavigate();
  const [availabilities, setAvailabilities] = useState<Availability>({
    monday: Array(24).fill(false),
    tuesday: Array(24).fill(false),
    wednesday: Array(24).fill(false),
    thursday: Array(24).fill(false),
    friday: Array(24).fill(false),
    saturday: Array(24).fill(false),
    sunday: Array(24).fill(false),
  });

  const handleToggle = (day: keyof Availability, index: number) => {
    setAvailabilities((prevAvailabilities) => {
      const updatedDay = [...prevAvailabilities[day]];
      updatedDay[index] = !updatedDay[index];
      return {
        ...prevAvailabilities,
        [day]: updatedDay,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availabilities: availabilities }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate("/social");
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/interest');
  };

  return (
    <section id="container">
      <section id="content">
        <h2>When are you available?</h2>
        <form onSubmit={handleSubmit}>
          <table className="availability-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>T</th>
                <th>F</th>
                <th>S</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(24)].map((_, hour) => (
                <tr key={hour}>
                  <td>{`${hour}:00 - ${hour + 1}:00`}</td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.monday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('monday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.tuesday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('tuesday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.wednesday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('wednesday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.thursday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('thursday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.friday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('friday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.saturday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('saturday', hour)}
                    />
                  </td>
                  <td>
                    <button
                      className={`availability-button ${availabilities.sunday[hour] ? 'button-selected' : ''}`}
                      onClick={() => handleToggle('sunday', hour)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <div className="button-container">
            <div className="back-button">
              <button type="button" onClick={handleBack}>
                Back
              </button>
            </div>
            <div className="next-button">
              <button type="submit">Next</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AvailabilityPage;
