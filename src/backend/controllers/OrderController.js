import { Response } from 'miragejs';
import { formatDate, requiresAuth } from '../utils/authUtils';
import { v4 as uuid } from 'uuid';

/**
 * This handler handles getting items to user's orders.
 * send GET Request at /api/user/orders
 * */
export const getOrdersHandler = function (schema, request) {
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
  const userOrders = schema.users.findBy({ _id: userId }).orders;
  return new Response(200, {}, { orders: userOrders });
};

/**
 * This handler handles adding items to user's orders.
 * send POST Request at /api/user/orders
 * body contains {products}
 * */

export const addOrderHandler = function (schema, request) {
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
    const userOrders = schema.users.findBy({ _id: userId }).orders;
    const { orderDetails } = JSON.parse(request.requestBody);
    userOrders.push({
      _id: uuid(),
      ...orderDetails,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });

    this.db.users.update({ _id: userId }, { cart: [] });
    this.db.users.update({ _id: userId }, { orders: userOrders });
    return new Response(201, {}, { orders: userOrders });
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

export const getOrderHandler = function (schema, request) {
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
    const userOrders = schema.users.findBy({ _id: userId }).orders;
    const orderId = request.params.orderId;
    const order = userOrders.find((order) => order._id === orderId);
    if (!order) {
      new Response(
        404,
        {},
        {
          errors: ['Order not found'],
        }
      );
    }

    return new Response(200, {}, { order });
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
 * This handler handles removing items to user's cart.
 * send DELETE Request at /api/user/cart/:productId
 * */

export const cancelOrderHandler = function (schema, request) {
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
    let userOrders = schema.users.findBy({ _id: userId }).orders;
    const orderId = request.params.orderId;
    userOrders = userOrders.filter((item) => item._id !== orderId);
    this.db.users.update({ _id: userId }, { orders: userOrders });
    return new Response(200, {}, { orders: userOrders });
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
