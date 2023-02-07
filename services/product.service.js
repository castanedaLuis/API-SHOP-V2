const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

//const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error',(err)=>{
    //   console.error(err);
    // })
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const product = await models.Product.create(data);
    return product;
  }

  async find() {
    const products = await models.Product.findAll({
      include:['category']
    });
    return products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    //obtenemos el index
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }


  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;