const { Order, Product } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getAll(req, res, next) {
  try {
  } catch (error) {}
}

async function getOne(req, res, next) {
  try {
  } catch (error) {}
}

async function insert(req, res, next) {
  try {
    const body = req.body;

    const products = await Product.findAll({
      where: {
        id: {
          [Op.or]: body.products,
        },
      },
    });
    const order = await Order.create({
        UserId: req.user.id,
        status:'complete',
        totalPrice: req.body.totalPrice

    })
    const allProducts = body.products.map(id => {
      return products.find(p => p.id === id);
    });
    console.log(allProducts);

    order.addProducts(allProducts);




    res.json(products);
  } catch (error) {
      res.status(500).send('ups')
  }
}

module.exports = {
  getOne,
  getAll,
  insert,
};
