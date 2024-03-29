import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: 'Jhon',
    lastName: 'Doe',
    email: 'john@gmail.com',
    password: '123456',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    address: [
      {
        _id: uuid(),
        title: 'My office address',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '9944523140',
        state: 'karnataka',
        city: 'Bangalore',
        pincode: '432543',
        addressLine1: 'Demo Road, test address',
        addressLine2: 'Test address line 2',
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
  },
];
