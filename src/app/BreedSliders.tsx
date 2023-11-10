import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BreedSlider from './BreedSlider';
import BREEDS from '../../public/breeds';
import { BreedPercent } from './page';
import styled from 'styled-components';
import { Button } from '@mui/material';

interface BreedSlidersProps {
  userBreedPercents: BreedPercent[];

  setUserBreedPercents: Dispatch<SetStateAction<BreedPercent[]>>;
  isFinished: boolean;
}

const BreedSliders = (props: BreedSlidersProps) => {
  const { userBreedPercents, setUserBreedPercents, isFinished } = props;
  const breeds = userBreedPercents;
  const [percentRemaining, setPercentRemaining] = useState(73);
  const [numberOfSelectedBreeds, setNumberOfSelectedBreeds] = useState(0);

  let biggestSelectedPercentage = 0;
  userBreedPercents.forEach((breed) => {
    if (breed.percent > biggestSelectedPercentage) {
      biggestSelectedPercentage = breed.percent;
    }
  });

  useEffect(() => {
    setNumberOfSelectedBreeds(0);
    userBreedPercents.forEach((breed) => {
      if (breed.isSelected) {
        setNumberOfSelectedBreeds((prev) => prev + 1);
      }
    });
  }, [userBreedPercents]);

  useEffect(() => {
    let totalPercent = 0;
    breeds.forEach((breed) => (totalPercent += breed.percent));
    setPercentRemaining(73 - totalPercent);
  }, [breeds]);

  let biggestPotentialPercentage = biggestSelectedPercentage + percentRemaining;

  const handleBreedPercentChange = (percent: number, name: string) => {
    let newBreedPercents = [...userBreedPercents];
    let breedIndex = newBreedPercents.findIndex((breed) => breed.name === name);

    newBreedPercents[breedIndex].percent = percent;
    setUserBreedPercents(newBreedPercents);
  };

  const handleToggleSelectBreed = (name: string) => {
    let newBreedPercents = [...userBreedPercents];
    let breedIndex = newBreedPercents.findIndex((breed) => breed.name === name);

    newBreedPercents[breedIndex].isSelected =
      !newBreedPercents[breedIndex].isSelected;
    setUserBreedPercents(newBreedPercents);
  };

  return (
    <Wrapper>
      <h1>Pick 6 Breeds</h1>

      <br />
      <br />
      {breeds.map((breed, index) => {
        return (
          // <div key={index}>test</div>
          <BreedSlider
            key={breed.name}
            breed={breed}
            isFinished={isFinished}
            percentRemaining={percentRemaining}
            handlePercentChange={handleBreedPercentChange}
            handleToggleSelected={handleToggleSelectBreed}
            biggestPotentialPercentage={biggestPotentialPercentage}
            numberOfSelectedBreeds={numberOfSelectedBreeds}
          />
        );
      })}
      <br />
      <br />
      <h3>Required to submit:</h3>
      <p>
        {' '}
        Selected {numberOfSelectedBreeds} of 6 breeds.{' '}
        {numberOfSelectedBreeds === 6 ? <CheckMark>✅</CheckMark> : null}
      </p>
      <p>
        {' '}
        Accounted for {73 - percentRemaining}% of 73%{' '}
        {percentRemaining === 0 ? <CheckMark>✅</CheckMark> : null}
      </p>
      <br />
      <br />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CheckMark = styled.span`
  color: #0175ff;
`;

export default BreedSliders;
