import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-login.css';

const InterestPage: React.FC = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const selectedInterests = {
      sport: interests.includes('sport'),
      art: interests.includes('art'),
      photography: interests.includes('photography'),
      anime: interests.includes('anime'),
      gaming: interests.includes('gaming'),
      sleep: interests.includes('sleep'),
      cooking: interests.includes('cooking'),
      reading: interests.includes('reading'),
    };

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/interests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ interests: selectedInterests }),
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate('/availability');
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/preference');
  };

  return (
    <section id="container">
      <section id="content">
        <h2>What are your interests?</h2>
        <form onSubmit={handleSubmit}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="sport"
              checked={interests.includes('sport')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Sport
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="art"
              checked={interests.includes('art')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Art
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="photography"
              checked={interests.includes('photography')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Photography
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="anime"
              checked={interests.includes('anime')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Anime
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="gaming"
              checked={interests.includes('gaming')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Gaming
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="sleep"
              checked={interests.includes('sleep')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Sleep
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="cooking"
              checked={interests.includes('cooking')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Cooking
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="interests"
              value="reading"
              checked={interests.includes('reading')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Reading
          </label>
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

export default InterestPage;
