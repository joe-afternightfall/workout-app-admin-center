import React from 'react';
import SvgComponent from './SvgComponent';

export default function FrontSide(): JSX.Element {
  return (
    <svg
      width={'100%'}
      height={'100%'}
      viewBox={'0 0 100 207'}
      xmlns={'http://www.w3.org/2000/svg'}
      xmlSpace={'preserve'}
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.41421,
      }}
    >
      <rect
        id={'front-art-board'}
        x={'0'}
        y={'0'}
        width={'90.551'}
        height={'206.785'}
        style={{ fill: 'none' }}
      />
      <g id={'Front-Muscles'}>
        <SvgComponent
          muscleName={'deltoids'}
          paths={[
            'M35.684,38.139c0,0 -12.432,-7.085 -17.512,3.476c-1.869,3.885 -0.459,16.146 -0.401,16.71c0.038,0.373 3.69,-7.88 6.817,-9.625c0.537,-0.299 -0.144,-8.31 11.096,-10.561Z',
            'M52.463,38.139c0,0 12.432,-7.085 17.512,3.476c1.869,3.885 0.459,16.146 0.401,16.71c-0.038,0.373 -3.69,-7.88 -6.818,-9.625c-0.536,-0.299 0.145,-8.31 -11.095,-10.561Z',
          ]}
          fill={'#333'}
        />

        <SvgComponent
          muscleName={'biceps'}
          paths={[
            'M25.232,48.934c0,0 1.105,16.785 -0.186,17.535c-1.481,0.86 -2.239,9.14 -2.239,9.14c0,0 -0.746,-2.099 -1.585,-2.005c-0.84,0.093 -2.425,1.679 -2.752,2.238c-0.326,0.56 -5.223,-17.301 6.762,-26.908Z',
            'M63.528,51.098c0,0 -1.105,16.784 0.187,17.534c1.481,0.861 2.238,9.141 2.238,9.141c0,0 0.746,-2.099 1.586,-2.005c0.839,0.093 2.425,1.678 2.751,2.238c0.327,0.56 5.223,-17.302 -6.762,-26.908Z',
          ]}
          fill={'#404040'}
        />

        <SvgComponent
          muscleName={'pectorals'}
          paths={[
            'M42.057,40.112c-0.311,3.984 2.007,8.955 2.037,11.938c0.04,4.039 -0.33,7.303 -7.463,8.098c-5.733,0.638 -7.022,-1.737 -8.88,-2.919c-1.159,-0.738 -1.515,-8.373 -2.573,-9.527c-0.723,-0.788 3.991,-8.909 10.523,-8.851c6.532,0.057 6.421,0.425 6.356,1.261Z',
            'M46.136,40.112c0.311,3.984 -2.008,8.955 -2.037,11.938c-0.04,4.039 0.329,7.303 7.463,8.098c5.733,0.638 7.022,-1.737 8.879,-2.919c1.16,-0.738 1.515,-8.373 2.574,-9.527c0.723,-0.788 -3.991,-8.909 -10.523,-8.851c-6.533,0.057 -6.422,0.425 -6.356,1.261Z',
          ]}
          fill={'#595959'}
        />

        <SvgComponent
          muscleName={'obliques'}
          paths={[
            'M36.007,62.836c0,0 1.395,31.809 0,32.945c-1.394,1.136 -1.678,-6.343 -6.79,-7.195c-0.953,-0.159 -0.163,-17.23 -2.449,-21.3c-2.285,-4.071 8.267,-5.775 9.239,-4.45Z',
            'M51.917,62.836c0,0 -1.395,31.809 0,32.945c1.394,1.136 1.678,-6.343 6.79,-7.195c0.953,-0.159 0.163,-17.23 2.449,-21.3c2.285,-4.071 -8.267,-5.775 -9.239,-4.45Z',
          ]}
          fill={'#262626'}
        />

        <SvgComponent
          muscleName={'abs'}
          paths={[
            'M44.343,60.277c0,0 -5.885,-1.868 -8.56,1.474c-2.675,3.341 0.465,16.298 -0.248,21.113c-0.713,4.815 3.292,24.8 5.331,25.563c1.267,0.475 2.143,0.569 3.567,-0.089c1.256,-0.58 7.126,-13.883 7.896,-25.594c0.356,-5.416 4.855,-21.729 -2.992,-22.913c-4.539,-0.685 -4.994,0.446 -4.994,0.446Z',
          ]}
          fill={'#595959'}
        />

        <SvgComponent
          muscleName={'quads'}
          paths={[
            'M31.536,95.898c0,0 11.073,23.633 10.268,34.698c-0.805,11.065 -2.012,14.887 -2.012,17.704c0,2.816 0.361,-4.209 -3.165,-4.225c-4.132,-0.019 -7.219,3.332 -8.338,7.023c-0.159,0.527 -0.999,-10.497 -0.999,-10.497c0,0 -1.416,-3.038 -2.386,-13.241c-1.468,-15.448 10.299,-21.015 6.632,-31.462',
            'M56.329,95.898c0,0 -11.073,23.633 -10.268,34.698c0.804,11.065 2.012,14.887 2.012,17.704c0,2.816 -0.361,-4.209 3.165,-4.225c4.131,-0.019 7.219,3.332 8.337,7.023c0.16,0.527 0.999,-10.497 0.999,-10.497c0,0 1.417,-3.038 2.387,-13.241c1.468,-15.448 -10.299,-21.015 -6.632,-31.462',
          ]}
          fill={'#333'}
        />

        <SvgComponent
          muscleName={'adductors'}
          paths={[
            'M34.684,93.947c0,0 4.231,11.716 5.884,14.86c2.454,4.668 3.854,8.447 3.487,9.049c-0.368,0.602 -1.254,9.8 -1.32,8.966c-0.474,-6.017 -7.45,-29.324 -8.592,-30.924c-0.63,-0.882 0.537,-1.957 0.541,-1.951Z',
            'M53.036,93.947c0,0 -4.231,11.716 -5.884,14.86c-2.454,4.668 -3.854,8.447 -3.487,9.049c0.368,0.602 1.254,9.8 1.32,8.966c0.474,-6.017 7.45,-29.324 8.592,-30.924c0.63,-0.882 -0.537,-1.957 -0.541,-1.951Z',
          ]}
          fill={'#4d4d4d'}
        />
      </g>
      <path
        id={'front-body-outline'}
        d={
          'M44.055,118.158c-0.3,3.531 3.185,22.306 4.422,29.636c0.589,3.472 2.204,9.13 1.623,12.134c-0.83,4.187 -1.07,9.604 -0.613,12.759c0.288,1.916 1.195,10.752 -0.103,13.984c-0.678,1.695 -1.922,10.38 -1.922,10.38c-3.241,8.182 -1.412,7.779 -1.412,7.779c1.003,1.231 2.722,0.097 2.722,0.097c1.309,0.834 2.215,-0.198 2.215,-0.198c1.124,0.93 2.434,-0.115 2.434,-0.115c1.412,0.733 2.721,-0.618 2.721,-0.618c0.811,0.408 1.009,-0.108 1.009,-0.108c2.433,-0.156 -1.357,-7.941 -1.357,-7.941c-0.908,-6.993 0.9,-10.884 0.9,-10.884c5.923,-17.565 6.224,-22.226 3.856,-28.845c-0.666,-1.911 -0.835,-2.668 -0.528,-3.497c0.709,-1.915 0.192,-9.617 1.057,-12.675c1.669,-5.898 3.316,-20.856 4.174,-27.836c1.153,-9.401 -4.085,-22.007 -4.085,-22.007c-1.147,-5.129 0.535,-23.406 0.535,-23.406c2.349,3.655 2.259,10.107 2.259,10.107c-0.373,6.766 5.466,17.107 5.466,17.107c2.806,4.274 3.868,8.328 3.868,8.629c0,1.231 -0.269,4.212 -0.269,4.212l0.107,2.595c0.049,0.661 0.42,2.937 0.36,4.037c-0.438,6.769 0.638,5.495 0.638,5.495c0.907,0 1.904,-5.447 1.904,-5.447c0,1.405 -0.343,5.61 0.415,7.197c0.906,1.892 1.573,-0.325 1.585,-0.77c0.24,-8.619 0.758,-6.361 0.758,-6.361c0.504,6.992 1.123,8.572 2.234,8.025c0.842,-0.401 0.072,-8.391 0.072,-8.391c1.441,4.746 2.534,5.502 2.534,5.502c2.379,1.67 0.908,-2.943 0.578,-3.856c-1.76,-4.854 -1.815,-6.536 -1.815,-6.536c2.199,4.361 3.857,4.2 3.857,4.2c2.144,-0.685 -1.875,-6.86 -4.23,-9.819c-1.201,-1.507 -2.751,-3.526 -3.201,-4.724c-0.733,-2.03 -1.286,-8.557 -1.286,-8.557c-0.222,-7.702 -2.126,-11.047 -2.126,-11.047c-3.255,-5.211 -3.868,-14.93 -3.868,-14.93l-0.144,-16.411c-1.141,-11.194 -9.389,-11.274 -9.389,-11.274c-8.337,-1.241 -9.497,-3.935 -9.497,-3.935c-1.766,-2.541 -0.757,-7.412 -0.757,-7.412c1.465,-1.192 2.03,-4.355 2.03,-4.355c2.433,-1.866 2.313,-4.596 1.19,-4.566c-0.902,0.024 -0.698,-0.723 -0.698,-0.723c1.522,-12.288 -9.387,-12.915 -9.387,-12.915l-1.665,0c0,0 -10.914,0.627 -9.395,12.912c0,0 0.204,0.748 -0.705,0.723c-1.121,-0.03 -1.225,2.7 1.199,4.566c0,0 0.564,3.162 2.03,4.355c0,0 1.009,4.871 -0.757,7.412c0,0 -1.156,2.694 -9.497,3.935c0,0 -8.262,0.08 -9.385,11.274l-0.156,16.411c0,0 -0.601,9.719 -3.869,14.93c0,0 -1.895,3.346 -2.114,11.047c0,0 -0.556,6.527 -1.286,8.557c-0.445,1.192 -1.993,3.211 -3.205,4.724c-2.375,2.953 -6.368,9.115 -4.232,9.819c0,0 1.666,0.161 3.856,-4.2c0,0 -0.045,1.67 -1.802,6.536c-0.345,0.901 -1.814,5.514 0.565,3.856c0,0 1.102,-0.757 2.535,-5.502c0,0 -0.769,7.99 0.086,8.391c1.118,0.548 1.728,-1.033 2.232,-8.025c0,0 0.517,-2.258 0.756,6.361c0.012,0.445 0.664,2.662 1.575,0.77c0.768,-1.587 0.423,-5.785 0.423,-7.197c0,0 0.986,5.448 1.907,5.448c0,0 1.084,1.273 0.639,-5.496c-0.072,-1.106 0.316,-3.376 0.364,-4.037l0.105,-2.595c0,0 -0.271,-2.974 -0.271,-4.212c0,-0.307 1.064,-4.355 3.869,-8.629c0,0 5.833,-10.346 5.457,-17.107c0,0 -0.081,-6.452 2.268,-10.107c0,0 1.667,18.276 0.537,23.406c0,0 -5.247,12.606 -4.09,22.007c0.853,6.998 2.496,21.937 4.169,27.836c0.874,3.052 0.357,10.752 1.058,12.675c0.316,0.835 0.15,1.605 -0.529,3.497c-2.355,6.619 -2.055,11.281 3.868,28.845c0,0 1.823,3.892 0.902,10.884c0,0 -3.784,7.785 -1.361,7.941c0,0 0.19,0.516 1.01,0.108c0,0 1.309,1.351 2.723,0.618c0,0 1.31,1.046 2.43,0.115c0,0 0.898,1.032 2.207,0.198c0,0 1.718,1.159 2.739,-0.097c0,0 1.814,0.403 -1.415,-7.779c0,0 -1.237,-8.675 -1.919,-10.38c-1.3,-3.231 -0.382,-12.086 -0.105,-13.984c0.447,-3.172 0.208,-8.577 -0.609,-12.759c-0.598,-2.997 1.021,-8.656 1.619,-12.134c1.228,-7.323 4.403,-29.633 4.403,-29.633Z'
        }
        style={{ fill: 'none', stroke: '#000', strokeWidth: '1px' }}
      />
    </svg>
  );
}
