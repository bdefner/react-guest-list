/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import FetchGuests from './FetchGuests';

const appWrapStyles = css`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  padding: 100px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .input-wrap {
    display: flex;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }

  form {
    background-color: #fdfdfe;
    padding: 25px;
    filter: drop-shadow(-7px -3px 25px #616161);
    border-radius: 5px;

    & .input-wrap {
      padding: 5px;
      border: solid 2px #e5e5e7;
      border-radius: 5px;
    }

    & input {
      border: 0px;
    }

    & button {
      border: 0px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      font-size: 20px;
      font-weight: 900;
      background-color: FFD359;
      background-image: FFD359;
      background: FFD359;
      color: whitesmoke;
      cursor: pointer;
      outline: 0;
    }
  }
`;

function App() {
  return (
    <div css={appWrapStyles}>
      <section>
        <FetchGuests />
      </section>
    </div>
  );
}

export default App;
