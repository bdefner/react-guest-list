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
  // const [filter, setFilter] = useState('all');
  // let attendingGuests = [];
  // let notAttendingGuests = [];

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGuests().catch(() => console.error);
  }, []);

  // function updateFilter(guests) {
  //   attendingGuests = [
  //     ...guests.filter((guest) => {
  //       return guest.attending === true;
  //     }),
  //   ];
  //   notAttendingGuests = [
  //     ...guests.filter((guest) => {
  //       return guest.attending === false;
  //     }),
  //   ];
  //   console.log('Attending:', attendingGuests);
  //   console.log('Not attending:', notAttendingGuests);
  //   console.log('Not attending length:', notAttendingGuests.length);
  // }

  async function addGuest() {
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    fetchGuests().catch(() => {});
  }

  async function removeGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
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
    await response.json();

    fetchGuests().catch(() => console.error);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFirstName('');
    setLastName('');
  }

  async function deleteAll() {
    await guests.map(async (guest) => {
      await fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      }).catch(() => console.error);
    });
    fetchGuests().catch(() => console.error);
  }

  return (
    <div>
      <section>
        <div id="add-guest-wrap">
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
          <div id="filter-wrap">
            <button onClick={() => deleteAll()}>Delete all</button>
            <p>Filter: </p>
            <button>All ({guests.length})</button>
            <button>Attending ({0})</button>
            <button>Not attending ({0})</button>
          </div>
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
