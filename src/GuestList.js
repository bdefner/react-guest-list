import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

function LoadingScreen(props) {
  if (props.isLoading) {
    return <div id="loading-screen">Loading...</div>;
  }
}

export default function FetchGuests() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
    setIsLoading(false);
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
    console.log(createdGuest);

    // const newState = [createdGuest[0], ...guests];
    // setGuests(newState);
    // console.log(`guests[0] = ${guests[0]}`);
    fetchGuests().catch(() => {});
    // setFirstName('');
    // setLastName('');
  }

  async function removeGuest(id) {
    console.log(guests);
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
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
    const updatedGuest = await response.json();
    console.log(updatedGuest);

    console.log(id);

    fetchGuests().catch(() => {});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFirstName('');
    setLastName('');
  }

  return (
    <div>
      <section>
        <div id="form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="input-wrap">
              <div>
                <label htmlFor="first-name-input">First name</label>
                <input
                  id="first-name-input"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                  value={firstName}
                />
              </div>
              <div>
                <label htmlFor="last-name-input">Last name</label>
                <input
                  id="last-name-input"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                  value={lastName}
                />
              </div>
              <button onClick={() => addGuest()}>+</button>
            </div>
          </form>
        </div>
      </section>
      <LoadingScreen isLoading={isLoading} />
      {guests.map((guest) => {
        return (
          <div key={guest.id} data-test-id="guest" className="guest-wrap">
            <div>
              <h2>{guest.firstName}</h2>
              <h2>{guest.lastName}</h2>
            </div>
            <div>
              <div id="attending-wrap">
                <label htmlFor="attending-checkbox"> Is attending?</label>
                <input
                  type="checkbox"
                  id="attending-checkbox"
                  checked={guest.attending ? true : false}
                  onChange={() => updateGuest(guest.id, guest.attending)}
                  aria-label={`${guest.firstName} ${guest.lastName}attending status`}
                />
              </div>
              <button onClick={() => removeGuest(guest.id)} aria-label="Remove">
                —
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
