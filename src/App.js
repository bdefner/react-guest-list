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
  return (
    <div css={appWrapStyles}>
      <section>
        <FetchGuests />
      </section>
    </div>
  );
}

export default App;
