import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-login.css';

const GenderPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');

  const [genders, setGenders] = useState({
    male: false,
    female: false,
    nonBinary: false,
  });

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedGenders = {
      ...genders,
      male: selectedGender === 'male',
      female: selectedGender === 'female',
      nonBinary: selectedGender === 'nonBinary',
    };

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/genders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genders: updatedGenders }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate('/preference');
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="container">
      <section id="content">
        <h2>What is your gender?</h2>
        <form onSubmit={handleSubmit}>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={selectedGender === 'male'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            Male
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={selectedGender === 'female'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            Female
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="nonBinary"
              checked={selectedGender === 'nonBinary'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            Non-Binary
          </label>
          <br />
          <br />
          <div className="button-container-only">
            <div className="next-button-only">
              <button type="submit">Next</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default GenderPage;
