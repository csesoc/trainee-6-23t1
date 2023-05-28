import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Socials: React.FC = () => {
  const navigate = useNavigate();
  const [socials, setSocials] = useState({
    phone: '',
    instagram: '',
    facebook: '',
    discord: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocials((prevSocials) => ({ ...prevSocials, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socials }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate("/profilePage");
      } else {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/availability');
  };

  return (
    <section id="container">
      <section id="content">
        <h2>What are your socials?</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Phone:
            <br />
            <input
              type="text"
              name="phone"
              value={socials.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Instagram:
            <br />
            <input
              type="text"
              name="instagram"
              value={socials.instagram}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Facebook:
            <br />
            <input
              type="text"
              name="facebook"
              value={socials.facebook}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Discord:
            <br />
            <input
              type="text"
              name="discord"
              value={socials.discord}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <div className="button-container">
            <div className="back-button">
              <button type="button" onClick={handleBack}>
                Back
              </button>
            </div>
            <div className="next-button">
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Socials;
