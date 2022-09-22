/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import FetchGuests from './FetchGuests';

const appWrapStyles = css`
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input-wrap {
    display: flex;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

function App() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  return (
    <div css={appWrapStyles}>
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
          </form>
        </div>
      </section>
      <section>
        <FetchGuests fName={firstName} lName={lastName} />
      </section>
    </div>
  );
}

export default App;
