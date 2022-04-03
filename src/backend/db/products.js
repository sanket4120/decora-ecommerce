import { v4 as uuid } from 'uuid';

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    author: 'Shiv Khera',
    categoryName: 'furniture',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/chair.png?raw=true',
    title: 'Retrostar Velvet Chair',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    price: '3000',
    discountPrice: '2000',
    rating: '4.5',
    stock: '10',
  },
  {
    _id: uuid(),
    author: 'Junaid Qureshi',
    categoryName: 'furniture',
    title: 'Wall Desk',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/furniture.png?raw=true',
    price: '3000',
    rating: '5',
    stock: '10',
  },
  {
    _id: uuid(),
    author: 'Junaid Qureshi',
    categoryName: 'textile',
    rating: '4.7',
    stock: '0',
    title: 'Tropical Pillow',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/textile.png?raw=true',
    price: '3000',
    discountPrice: '2000',
  },
  {
    _id: uuid(),
    author: 'Junaid Qureshi',
    categoryName: 'lighting',
    rating: '4',
    stock: '10',
    title: 'Pendent Lamp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://github.com/sanket4120/Decora/blob/Dev/assets/lighting.png?raw=true',
    price: '3000',
  },
];
