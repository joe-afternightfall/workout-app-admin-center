import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function BackSideControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector muscleName={'forearms'} title={'Forearms'} />
      <Selector muscleName={'triceps'} title={'Triceps'} />

      <SectionTitle title={'Back'} />
      <Selector muscleName={'trapezius'} title={'Trapezius'} />
      <Selector muscleName={'lats'} title={'Lats'} />

      <SectionTitle title={'Legs'} />
      <Selector muscleName={'calves'} title={'Calves'} />
      <Selector muscleName={'hamstrings'} title={'Hamstrings'} />
      <Selector muscleName={'glutes'} title={'Glutes'} />
    </div>
  );
}
