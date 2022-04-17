import { Response } from 'miragejs';

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = function () {
  return new Response(200, {}, { products: this.db.products });
};

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/user/products/:productId
 * */

export const getProductHandler = function (schema, request) {
  const productId = request.params.productId;
  try {
    const product = schema.products.findBy({ _id: productId });
    return new Response(200, {}, { product });
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

export const getTopProductHandler = function () {
  try {
    let products = this.db.products;
    products = products
      .sort((productA, productB) => productB.rating - productA.rating)
      .slice(0, 3);
    return new Response(200, {}, { products });
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

export const getFeaturedProductHandler = function () {
  try {
    let products = this.db.products;
    products = products
      .filter((product) => product.discount)
      .sort((productA, productB) => productB.discount - productA.discount)
      .slice(0, 8);
    return new Response(200, {}, { products });
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
