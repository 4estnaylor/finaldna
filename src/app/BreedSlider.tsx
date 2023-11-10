import { Alert, Input, InputAdornment, Slider, Switch } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BreedPercent } from './page';

interface BreedSliderProps {
  // name: string;
  // color: string;
  breed: BreedPercent;
  handlePercentChange: (percent: number, name: string) => void;
  handleToggleSelected: (name: string) => void;
  // percent: number;
  percentRemaining: number;
  biggestPotentialPercentage: number;
  numberOfSelectedBreeds: number;
  isFinished: boolean;
  breedIndex: number;
}

const BreedSlider = (props: BreedSliderProps) => {
  const {
    breed,
    handlePercentChange,
    percentRemaining,
    handleToggleSelected,
    biggestPotentialPercentage,
    numberOfSelectedBreeds,
    isFinished,
    breedIndex,
  } = props;

  console.log({ breedIndex });

  const { name, color, percent, isSelected, correct } = breed;

  const formattedBreedName = name.split(' ').join('_').toLowerCase();
  // const [isOn, setIsOn] = React.useState(false);

  useEffect(() => {
    if (!isSelected) {
      handlePercentChange(0, name);
    }
  }, [isSelected, handlePercentChange, name]);

  const imgSrc = `/milobreeds/${formattedBreedName}.png`;

  let difference = correct - percent;
  if (difference < 0) {
    difference = 0;
  }
  let points = correct - difference;
  if (points < 0) {
    points = 0;
  }

  // let sliderBlockerWidth = 0;
  // if (percentRemaining < 50) {
  //   sliderBlockerWidth = (73 * (100 - (percent + percentRemaining))) / 100;
  // }
  let sliderWidth = (100 / 73) * (percentRemaining + percent);
  if (sliderWidth > 100) {
    sliderWidth = 100;
  }

  return (
    <Wrapper color={color} $isOn={isSelected}>
      <TopBar>
        <LeftSideWrapper>
          <HorizontalFlexWrapper>
            <h4>{name}</h4>{' '}
            <PointsEarned $isOn={isFinished && correct >= 1}>
              +{points} points
            </PointsEarned>
            <Switch
              checked={isSelected}
              disabled={isFinished}
              onChange={() => {
                if (numberOfSelectedBreeds >= 6 && !isSelected) return;

                handleToggleSelected(name);
              }}
            />
          </HorizontalFlexWrapper>
        </LeftSideWrapper>

        <Body $isOn={isSelected}>
          <SideBySide>
            <ImageBackground>
              <Image src={imgSrc} height={150} width={150} alt="photo" />
            </ImageBackground>
            <ImageBackground>
              <Image
                src={`/milo${breedIndex % 4}.png`}
                height={150}
                width={150}
                alt="photo"
              />
            </ImageBackground>
          </SideBySide>
          <PercentagesWrapper>
            <div>
              <Percentage $isOn={isSelected || isFinished}>
                {percent}%
              </Percentage>
            </div>
            <div>
              <CorrectPercentage $isOn={isFinished && correct >= 1}>
                {correct}%
              </CorrectPercentage>
            </div>
          </PercentagesWrapper>
        </Body>
      </TopBar>
      <MySliderWrapper width={100}>
        <MySlider
          disabled={isFinished}
          $isOn={isSelected}
          width={sliderWidth}
          type="range"
          // inputProps={{
          //   step: 10,
          //   min: 0,
          //   max: 100,
          //   type: 'number',
          //   'aria-labelledby': 'input-slider',
          // }}
          value={typeof percent === 'number' ? percent : 0}
          min={0}
          max={
            percent + percentRemaining >= 50 ? 50 : percent + percentRemaining
          }
          step={1}
          onChange={(event: any) => {
            if (
              event.target.value > percent &&
              event.target.value - percent > percentRemaining
            ) {
              return;
            }
            let valueAsNumber = Number(event.target.value);
            handlePercentChange(valueAsNumber, name);
          }}
        />
        {/* <MySliderBlocker width={sliderBlockerWidth} /> */}
      </MySliderWrapper>

      {/* <Slider
        value={0}
        // value={typeof value === 'number' ? value : 0}
        // onChange={handleSliderChange}
        // aria-labelledby="input-slider"
      /> */}
    </Wrapper>
  );
};

const SideBySide = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  /* background-color: green; */
`;

const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  /* background-color: yellow; */
`;

const Wrapper = styled.div<{ color: string; $isOn: boolean }>`
  /* color: ${(p) => p.color}; */
  /* background-color: green; */
  width: 100%;
  transform: all 0.3s;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 150px;
  justify-content: space-around;
  background-color: ${(p) => (p.$isOn ? '#3a3e46' : '#3a3e4658')};
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  color: white;
`;

const HorizontalFlexWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 20px;
`;

const MySliderWrapper = styled.div<{ width: number }>`
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${(p) => p.width + '%'};
`;

const MySlider = styled.input<{ $isOn: boolean; width: number }>`
  color: 'inherit';
  width: ${(p) => p.width + '%'};
  visibility: ${(p) => (p.$isOn ? 'visible' : 'hidden')};
  & .MuiSlider-thumb {
    transition: 'none';
  }
  & .MuiSlider-track {
    transition: 'none';
  }
`;

const MySliderBlocker = styled.div<{ width: number }>`
  position: absolute;
  background-color: red;
  /* width: 50%; */
  width: ${(p) => p.width + '%'};
  right: 0;
  top: 0;
  height: 100%;
`;

const Percentage = styled.div<{ $isOn: boolean }>`
  font-size: 2.5rem;
  width: 100px;
  visibility: ${(p) => (p.$isOn ? 'visible' : 'hidden')};
  color: #c1dcfd;

  /* width: 100px; */
`;

const Body = styled.div<{ $isOn: boolean }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 20px;

  /* background-color: red; */

  opacity: ${(p) => (p.$isOn ? 1 : 0.3)};
`;

const PercentagesWrapper = styled.div`
  display: flex;

  justify-content: space-evenly;
  /* background-color: red; */

  color: #0175ff;
`;

const CorrectPercentage = styled(Percentage)<{ $isOn: boolean }>`
  visibility: ${(p) => (p.$isOn ? 'visible' : 'hidden')};
  color: limegreen;
`;

const PointsEarned = styled.div<{ $isOn: boolean }>`
  visibility: ${(p) => (p.$isOn ? 'visible' : 'hidden')};
  display: flex;
  /* align-items: center; */
  align-items: center;
  font-size: 1rem;
  color: greenyellow;
  font-weight: 800;
`;

const ImageBackground = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: darkgray;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export default BreedSlider;
