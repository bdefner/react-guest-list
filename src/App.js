/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
// import { useEffect, useState } from 'react';
import GuestList from './GuestList';

const appWrapStyles = css`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #333;
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

  .guest-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fdfdfe;
    margin-top: 25px;
    border-radius: 5px;
    & h2 {
      padding: 5px;
    }

    & div {
      display: flex;
    }
  }
`;

function App() {
  return (
    <div css={appWrapStyles}>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      />
      <section>
        <GuestList />
      </section>
    </div>
  );
}

export default App;
