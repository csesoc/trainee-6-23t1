import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
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

const timeOptions = Array.from({ length: 24 }, (_, i) => ({ label: `${i}:00 - ${i + 1}:00`, value: i }));

const AvailabilityPage: React.FC = () => {
  const navigate = useNavigate();
  const [availabilities, setAvailabilities] = useState<Availability>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const handleChange = (selectedOptions: any, { name }: { name?: string }) => {
    if (name) {
      const mutableSelectedOptions = selectedOptions as any[];
      setAvailabilities({ ...availabilities, [name.toLowerCase()]: mutableSelectedOptions.map((option: any) => option.value) });
    }
  };

  const handleReset = (day: string) => {
    setAvailabilities({ ...availabilities, [day.toLowerCase()]: [] });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const boolAvailabilities = Object.fromEntries(
      Object.entries(availabilities).map(([day, values]) => {
        const hours = Array(24).fill(false);
        values.forEach((value: number) => (hours[value] = true));
        return [day.toLowerCase(), hours];
      })
    );

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availabilities: boolAvailabilities }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        navigate('/social');
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
            <tbody>
              {Object.entries(availabilities).map(([day, values]) => (
                <tr key={day} className="availability-row">
                  <td>{day}</td>
                  <td>
                    <Select
                      name={day}
                      isMulti
                      value={values.map((value: number) => ({ label: `${value}:00 - ${value + 1}:00`, value }))}
                      onChange={handleChange}
                      options={timeOptions}
                      menuPlacement="auto"
                      closeMenuOnSelect={false}
                      hideSelectedOptions
                      isSearchable={false}
                      controlShouldRenderValue={false}
                      isClearable={false}
                      backspaceRemovesValue={false}
                      className="select-container"
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleReset(day)}>Reset</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button type="button" onClick={handleBack}>
              Back
            </button>
            <button type="submit">Next</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AvailabilityPage;
