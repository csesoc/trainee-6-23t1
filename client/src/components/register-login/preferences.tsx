import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-login.css';

const PrefPage: React.FC = () => {
  const navigate = useNavigate();
  const [preferredGenders, setPreferredGenders] = useState<string[]>([]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setPreferredGenders((prevGenders) => [...prevGenders, value]);
    } else {
      setPreferredGenders((prevGenders) =>
        prevGenders.filter((gender) => gender !== value)
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const genders = {
      male: preferredGenders.includes('male'),
      female: preferredGenders.includes('female'),
      nonBinary: preferredGenders.includes('nonBinary'),
    };

    try {
      const response = await fetch( import.meta.env.VITE_BACKEND_URL + '/profile/preferences',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferences: genders }),
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate('/interest');
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/gender');
  };

  return (
    <section id="container">
      <section id="content">
        <h2>What are your preferred gender(s)?</h2>
        <form onSubmit={handleSubmit}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="preferredGenders"
              value="male"
              checked={preferredGenders.includes('male')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Male
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="preferredGenders"
              value="female"
              checked={preferredGenders.includes('female')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Female
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="preferredGenders"
              value="nonBinary"
              checked={preferredGenders.includes('nonBinary')}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            Non-Binary
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

export default PrefPage;
