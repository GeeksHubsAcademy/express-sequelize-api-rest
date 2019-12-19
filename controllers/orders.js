const { Order, Product } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getAll(req, res, next) {
  try {
    const orders = await Order.findAll(
      {
        include: [Product]
      },

      // {include: [{model:Product}], as: 'products'}
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);

  }
}

async function getOne(req, res, next) {
  try {
    const orders = await Order.findAll(
      {
        where: {id: req.params.id},
        include: [Product],
      },

      // {include: [{model:Product}], as: 'products'}
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

async function insert(req, res, next) {
  try {
    const body = req.body;

    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: body.products,
        },
      },
    });
    // const allProducts = body.products.map(id => {
    //   return products.find(p => p.id === id);
    // });
    const order = await Order.create({
      UserId: req.user.id,
      status: 'complete',
      totalPrice: req.body.totalPrice,
    });
    await order.addProducts(products);

    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getOne,
  getAll,
  insert,
};
