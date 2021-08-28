import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function FrontSideControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector muscleName={'biceps'} title={'Biceps'} />
      <Selector muscleName={'deltoids'} title={'Deltoids'} />

      <SectionTitle title={'Core'} />
      <Selector muscleName={'abs'} title={'Abs'} />
      <Selector muscleName={'obliques'} title={'Obliques'} />
      <Selector muscleName={'pectorals'} title={'Pectorals'} />

      <SectionTitle title={'Legs'} />
      <Selector muscleName={'adductors'} title={'Adductors'} />
      <Selector muscleName={'quads'} title={'Quads'} />
    </div>
  );
}
