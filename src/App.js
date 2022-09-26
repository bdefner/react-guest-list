/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
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

  #loading-screen {
    color: white;
    padding: 25px;
    text-align: center;
  }

  .input-wrap {
    display: flex;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }

  #filter-wrap {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-top: 25px;
    color: white;
    border-radius: 5px;
    overflow: hidden;

    & button {
      background-color: white;
      border: 0px;
      padding: 8px 15px 8px 15px;
      outline: 0;
      cursor: pointer;
      font-size: 700;
    }

    & p {
      margin-left: 15px;
      margin-right: 5px;
    }
  }

  form {
    background-color: #fdfdfe;
    padding: 25px;
    border-radius: 5px;

    & > label {
      font-size: 10px;
    }

    & .input-wrap {
      padding: 5px;
      border: solid 2px #e5e5e7;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }

    & input {
      border: 0px;
      font-size: 20px;
    }

    & button {
      border: 0px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      font-size: 20px;
      font-weight: 900;
      background-color: #ffd359;
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
      margin-right: 25px;

      & #attending-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    & button {
      border: 0px;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      font-size: 20px;
      font-weight: 900;
      background-color: #eb7c7d;
      color: whitesmoke;
      cursor: pointer;
      outline: 0;
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
