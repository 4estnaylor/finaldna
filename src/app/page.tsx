'use client';
import Image from 'next/image';
import styles from './page.module.css';
import styled from 'styled-components';
import BreedSliders from './BreedSliders';
import BREEDS from '../../public/breeds';
import { useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

export type BreedPercent = {
  name: string;
  color: string;
  percent: number;
  isSelected: boolean;
  correct: number;
};

const miloLink =
  'http://em1.embarkvet.com/ls/click?upn=6boyTPJE7uVV-2F3jOYCsYhgRiqeIlxtV8TLgBPgxXMpRcxvsuZ7xuQ-2BHf2WZS0KRF9JKa5qfynyQKa1qHbWC4-2B86L2tbU5MPveeozamtsPuTIjuX-2BPurp6bOmWjA6iv4aqpeloWHipym9wz0rXr4s1ON2l7QB-2BrKyyetJUYgAJ9uhs-2FEE9VzIEubOfoW1wg2BptIGZaB19Z8UEzhAvtN7FtjBDe-2B5yBcOoQlJSfcva4M-3DEIS6_pegL5eiE0ny17x6qUkuBhC7rq4ooOxzddfWL016XcVR6sfsVQtuV8U8A4VPO5YIWGmYHAYCFB5blkFhbbzCaVSV1ICe2vzj-2FxwpEkdw7n-2B7OzcWDsKGYzfSdeWa-2F0c2cheNciXaFtIoJ8BRqn77tdAnAkRQwZ2YSesO-2B3yXUGoqhwHftrJ2Vi5OHu7q1y3zMPckgZmIqfENQA3VuwHq7dGWG0Jx-2BuuY6IJ9w1vuhlGl0WLJSntRztpqLueqqZ0DnMHbceBJKLUzXZBk8Hf0nQLSrfe4-2Fm0-2BPPeJWU4mW2-2B2YZovlT97ptkCoYHvB9vtz1zw48JlGlRk4-2BQrn-2FvlCpT-2Bom5SY0EYkd6FXRGERoApz6g9mPFJ8g2EfA-2BXZLHLj4yzLVKCOlfhVhy4xSAB-2BU5b-2F1kTEegr-2BZP4TzHoBPm8wMnA-2BjYAcajbGTw3jvKyyGjY0ZbHQyN5RstWUJ7ZJW0KP3GG8uMxW9Pj2AaFCTlI-3D';

export default function Home() {
  const breeds = BREEDS;
  let initialState: BreedPercent[] = [];
  breeds.forEach((breed) => {
    initialState.push({
      name: breed.name,
      color: breed.color,
      percent: 0,
      isSelected: false,
      correct: breed.correct,
    });
  });

  const [userBreedPercents, setUserBreedPercents] = useState(initialState);
  const [isFinished, setIsFinished] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const onSubmit = () => {
    console.log({ userBreedPercents });
    console.log({ breeds });

    let totalPoints = 0;

    userBreedPercents.forEach((userBreedPercent, index) => {
      let difference = userBreedPercent.correct - userBreedPercent.percent;
      if (difference < 0) {
        difference = 0;
      }
      let points = userBreedPercent.correct - difference;
      if (points < 0) {
        points = 0;
      }

      totalPoints += points;
    });

    setIsFinished(true);
    setUserPoints(totalPoints);
  };

  let numberOfSelectedBreeds = 0;
  userBreedPercents.forEach((breed) => {
    if (breed.isSelected) {
      numberOfSelectedBreeds += 1;
    }
  });

  // console.log({ userBreedPercents });

  let userAnswerTotalPercentage = 0;
  userBreedPercents.forEach((breed) => {
    userAnswerTotalPercentage += breed.percent;
  });

  // let userValues =

  return (
    <Wrapper>
      <div>
        <h1>{"Milo's DNA Ancestry"}</h1>
        <br />
        <br />
        <p>
          {
            " Try to guess the makeup of Milo's DNA according to his embark test. "
          }
        </p>
        <br />
        <br />
        <p>{"73 % of Milo's results matched to 6 distinct breeds ."}</p>
        <br />
        <br />
        <p>
          {`27% of Milo's DNA results are categorized as "Supermutt". We won't be guessing what's mixed in there. `}
        </p>
        <br />
        <br />
        <p>
          Use the toggle to pick your breeds and the slider to set a percentage.
        </p>

        <p></p>
        <br />
        <br />

        <p>
          {
            "FYI: No breed accounts for more than 50% of Milo's results. 4 of the breeds are there just to throw you off."
          }
        </p>
        <br />
        <br />
        <p>
          Winner gets a <em>crisp</em> $20 bill. Also, eternal glory.
        </p>
        <br />
        <br />

        <ImageWrapper>
          <Image
            src="/milowall.png"
            alt="milowall"
            width={400}
            height={400}
            priority
          />
          <MiloLabel>{userAnswerTotalPercentage}%</MiloLabel>
        </ImageWrapper>
        <br />
        <br />
        <BreedSliders
          isFinished={isFinished}
          userBreedPercents={userBreedPercents}
          setUserBreedPercents={setUserBreedPercents}
        />
        {isFinished ? (
          <>
            <FinalPoints>
              Your score:{' '}
              <span style={{ color: 'greenyellow' }}>{userPoints}</span>
            </FinalPoints>
            <br />
            <br />
            <a
              href={miloLink}
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              {` Link to Milo's results`}
            </a>
          </>
        ) : (
          <Button
            disabled={
              numberOfSelectedBreeds !== 6 || userAnswerTotalPercentage !== 73
            }
            variant="outlined"
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 650px;
  margin: auto;
  background-color: white;
  padding: 20px;
  color: #3a3e46;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 50%;
  height: 300px;
  width: 300px;
  background-color: red;
  margin: auto;
`;

const FinalPoints = styled.div`
  font-size: 2rem;
  font-weight: 800;
  border-radius: 8px;
  padding: 20px;
  background-color: #3a3e46;
  color: white;
`;

const MiloLabel = styled.div`
  position: absolute;
  background-color: #3a3e46;

  color: white;
  font-size: 46px;
  top: 220px;
  /* background-color: hsla(0deg, 0%, 0%, 1); */
  padding: 30px;
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
