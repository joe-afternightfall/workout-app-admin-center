import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function BothSidesControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector muscleName={'biceps'} title={'Biceps'} />
      <Selector muscleName={'deltoids'} title={'Deltoids'} />
      <Selector muscleName={'forearms'} title={'Forearms'} />
      <Selector muscleName={'triceps'} title={'Triceps'} />

      <SectionTitle title={'BackManikin'} />
      <Selector muscleName={'trapezius'} title={'Trapezius'} />
      <Selector muscleName={'lats'} title={'Lats'} />

      <SectionTitle title={'Core'} />
      <Selector muscleName={'abs'} title={'Abs'} />
      <Selector muscleName={'obliques'} title={'Obliques'} />
      <Selector muscleName={'pectorals'} title={'Pectorals'} />

      <SectionTitle title={'Legs'} />
      <Selector muscleName={'adductors'} title={'Adductors'} />
      <Selector muscleName={'calves'} title={'Calves'} />
      <Selector muscleName={'hamstrings'} title={'Hamstrings'} />
      <Selector muscleName={'glutes'} title={'Glutes'} />
      <Selector muscleName={'quads'} title={'Quads'} />
    </div>
  );
}
