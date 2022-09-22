import { useEffect, useState } from 'react';
import { firstName, lastName } from './FetchGuests';

const baseUrl = 'http://localhost:4000';

export default function FetchGuests() {
  const [guests, setGuests] = useState([]);

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
        firstName: 'props.fName',
        lastName: 'props.lName',
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
  return (
    <div>
      <button onClick={() => addGuest()}>Add</button>
      {guests.map((guest) => {
        return (
          <div key={guest.id}>
            <h2>{guest.firstName}</h2>
            <h2>{guest.lastName}</h2>
            <input type="checkbox" checked={guest.attending ? true : false} />
            <button>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
