import { Response } from 'miragejs';
import { formatDate, requiresAuth } from '../utils/authUtils';
import { v4 as uuid } from 'uuid';

/**
 * All the routes related to address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's address.
 * send GET Request at /api/user/address
 * */
export const getAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ['The email you entered is not Registered. Not Found error'],
      }
    );
  }
  const userAddress = schema.users.findBy({
    _id: userId,
  }).address;
  return new Response(
    200,
    {},
    {
      address: userAddress,
    }
  );
};

/**
 * This handler handles adding items to user's address.
 * send POST Request at /api/user/address
 * body contains {address}
 * */

export const addAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    const userAddress = schema.users.findBy({
      _id: userId,
    }).address;
    const { address } = JSON.parse(request.requestBody);
    userAddress.push({
      ...address,
      _id: uuid(),
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      201,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing items to user's address.
 * send DELETE Request at /api/user/address/:productId
 * */

export const removeAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    let userAddress = schema.users.findBy({
      _id: userId,
    }).address;

    const addressId = request.params.addressId;

    userAddress = userAddress.filter((item) => item._id !== addressId);
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      200,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding items to user's address.
 * send POST Request at /api/user/address/:productId
 * body contains {address}
 * */

export const updateAddressHandler = function (schema, request) {
  const addressId = request.params.addressId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    const userAddress = schema.users.findBy({
      _id: userId,
    }).address;

    const {
      address: {
        title,
        firstName,
        lastName,
        phoneNumber,
        state,
        city,
        pincode,
        addressLine1,
        addressLine2,
      },
    } = JSON.parse(request.requestBody);

    userAddress.forEach((address) => {
      if (address._id === addressId) {
        address.title = title;
        address.firstName = firstName;
        address.lastName = lastName;
        address.city = city;
        address.state = state;
        address.pincode = pincode;
        address.phoneNumber = phoneNumber;
        address.addressLine1 = addressLine1;
        address.addressLine2 = addressLine2;
        address.updatedAt = formatDate();
      }
    });
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      200,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
