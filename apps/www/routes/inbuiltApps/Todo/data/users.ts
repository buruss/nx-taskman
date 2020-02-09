export interface User {
  id: number;
  name: string;
  thumb: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'Alex Dolgove',
    thumb: '/images/avatar/stella-johnson.png',
  }, {
    id: 2,
    name: 'Domnic Harris',
    thumb: '/images/avatar/domnic-harris.png',
  }, {
    id: 3,
    name: 'Garry Sobars',
    thumb: '/images/avatar/garry-sobars.png',
  }, {
    id: 4,
    name: 'Stella Johnson',
    thumb: '/images/avatar/stella-johnson.png',
  }, {
    id: 5,
    name: 'John Smith',
    thumb: '/images/avatar/john-smith.png',
  }, {
    id: 6,
    name: 'Domnic Brown',
    thumb: '/images/avatar/domnic-brown.png',
  }
];

export default users;
