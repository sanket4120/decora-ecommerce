import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'furniture',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/furniture.png?raw=true',
  },
  {
    _id: uuid(),
    categoryName: 'lighting',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/lighting.png?raw=true',
  },
  {
    _id: uuid(),
    categoryName: 'decor',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/decor.png?raw=true',
  },
  {
    _id: uuid(),
    categoryName: 'textile',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/textile.png?raw=true',
  },
];
