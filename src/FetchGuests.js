import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function FetchGuests() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
  }

  useEffect(() => {
    fetchGuests().catch(() => {});
  }, []);

  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();

    fetchGuests().catch(() => {});
  }

  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    fetchGuests().catch(() => {});
  }

  async function updateGuest(id, attends) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attends ? false : true }),
    });

    fetchGuests().catch(() => {});
  }
  return (
    <div>
      <section>
        <div id="form-wrap">
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="input-wrap">
              <div>
                <label htmlFor="first-name-input">First name</label>
                <input
                  id="first-name-input"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name-input">Last name</label>
                <input
                  id="last-name-input"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </div>
              <button onClick={() => addGuest()}>+</button>
            </div>
          </form>
        </div>
      </section>
      {guests.map((guest) => {
        return (
          <div key={guest.id} data-test-id="guest">
            <h2>{guest.firstName}</h2>
            <h2>{guest.lastName}</h2>
            <input
              type="checkbox"
              checked={guest.attending ? true : false}
              onChange={() => updateGuest(guest.id, guest.attending)}
              aria-label={`${guest.firstName} ${guest.lastName}attending status`}
            />
            <button onClick={() => removeGuest(guest.id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
