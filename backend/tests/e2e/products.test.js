const request = require('supertest')(app);
const app = require('../..');

test('creates a new product', async (done) => {
  const productToCreate = {
    name: 'Jeans',
    seller: ['Chanel'],
    size: 'L',
    price: 20,
  };

  const response = await request
    .post('/products')
    .send(productToCreate)
    .expect(200);

  const productCreated = response.body;

  expect(productCreated).toMatchObject(productToCreate);

  done();
});
