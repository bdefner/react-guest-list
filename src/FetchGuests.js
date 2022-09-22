import { useEffect, useState } from 'react';
import { firstName, lastName } from './FetchGuests';

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

  async function addGuest(props) {
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
    console.log(createdGuest);

    const newState = [...guests];
    console.log(`newState = ${newState}`);
    newState.push(createdGuest[0]);
    // setGuests(newState);
    // console.log(`guests[0] = ${guests[0]}`);
    fetchGuests().catch(() => {});
  }

  // needs probalby to be async:
  async function removeGuest(id) {
    console.log(guests);
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    fetchGuests().catch(() => {});
  }

  async function updateGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();

    console.log(id);

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
            </div>
            <button onClick={() => addGuest()}>ADD</button>
          </form>
        </div>
      </section>
      {guests.map((guest) => {
        return (
          <div key={guest.id}>
            <h2>{guest.firstName}</h2>
            <h2>{guest.lastName}</h2>
            <input
              type="checkbox"
              checked={guest.attending ? true : false}
              onChange={() => updateGuest(guest.id)}
            />
            <button onClick={() => removeGuest(guest.id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
