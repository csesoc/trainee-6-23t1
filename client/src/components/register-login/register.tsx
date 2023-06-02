import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-login.css';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email: formValues.email,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
    };
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const value = await response.json();
      if (response.ok) {
        console.log(value.message); // Success message
        navigate('/gender');
      } else {
        console.error(value.error); // Error message
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  return (
    <div className="background">
      <section id="container">
        <section id="content">
          <h1>Enroll Now!</h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <br />
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <br />
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <br />
            <button type="submit">Register</button>
            <br />
            <br />
            <label>
              <a href="/login">Already enrolled?</a>
            </label>
          </form>
        </section>
      </section>
    </div>
  );
};

export default RegistrationPage;
