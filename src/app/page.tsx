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
  'http://embk.me/milo7444?utm_campaign=cns_ref_dog_pub_profile&utm_medium=other&utm_source=embark';

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
        <p>{"73 % of Milo's results matched to 6 distinct breeds."}</p>
        <br />
        <br />
        <p>
          {`27% of Milo's DNA results are categorized as "Supermutt". We won't be guessing for that portion of the results. `}
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
