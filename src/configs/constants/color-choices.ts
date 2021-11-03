import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from '@material-ui/core/colors';

export interface ColorChoice {
  id: string;
  name: string;
  color: string;
}

export const colorChoices: ColorChoice[] = [
  {
    id: 'f00c79b6-e08f-44dc-8d6a-0dc695e92c05',
    name: 'Red',
    color: red[500],
  },
  {
    id: 'd40724de-f81d-4f03-b199-85081d09d435',
    name: 'Pink',
    color: pink[500],
  },
  {
    id: 'e4eef885-651a-416e-b54a-1a66f16048ad',
    name: 'Purple',
    color: purple[500],
  },
  {
    id: 'd315bc8f-01d8-4384-a5c5-ee8d62c74cfd',
    name: 'Deep Purple',
    color: deepPurple[500],
  },
  {
    id: '6aaaa695-dc13-497a-9a5b-7c9f18ab3e68',
    name: 'Indigo',
    color: indigo[500],
  },
  {
    id: '1d5fcbf2-1ad7-47f3-8cb8-4c9a6b2f4758',
    name: 'Blue',
    color: blue[500],
  },
  {
    id: '7a6304c9-8fd9-4c80-9f09-64a5d291b2bf',
    name: 'Light Blue',
    color: lightBlue[500],
  },
  {
    id: 'ceb8f0a0-4857-414a-8ecb-5c330bec224d',
    name: 'Cyan',
    color: cyan[500],
  },
  {
    id: 'b1bf9765-5ac2-4111-bafd-236f4512c1de',
    name: 'Teal',
    color: teal[500],
  },
  {
    id: '4db1e15a-e04d-4d5d-be2f-8e5c2a47593d',
    name: 'Green',
    color: green[500],
  },
  {
    id: '422773ce-1baa-46e1-95d9-8b1ead9cf0b3',
    name: 'Light Green',
    color: lightGreen[500],
  },
  {
    id: 'cda42bc2-9fbe-4816-98a1-b463f2db78d5',
    name: 'Lime',
    color: lime[500],
  },
  {
    id: 'c67c1116-c902-48ca-9121-d666920666b3',
    name: 'Yellow',
    color: yellow[500],
  },
  {
    id: '45c6367e-7eee-4d58-8cc2-3971b435c3af',
    name: 'Amber',
    color: amber[500],
  },
  {
    id: '6985f2f6-b261-4543-bcc0-86dab19f406b',
    name: 'Orange',
    color: orange[500],
  },
  {
    id: '490bc427-cece-467b-8f40-755ba1b26318',
    name: 'Deep Orange',
    color: deepOrange[500],
  },
];
