const express = require('express')
const { ProductDatabase, sellerDatabase } = require('./database')
const flatted = require('flatted')
const productDatabase = require('./database/product-database')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/products', async (req, res) => {
  const products = await ProductDatabase.load()
  res.render('products', { products })
})

app.post('/products', async (req, res) => {
  const product = await productDatabase.insert(req.body)
  res.send(product)
})

app.delete('/products/:productId', async (req, res) => {
  await productDatabase.removeBy('id', req.params.productId)
})

app.get('/products/:productId', async (req, res) => {
  const product = await productDatabase.find(req.params.productId)
  if (!product) return res.status(404).send('Cannot find product')
  res.render('product', { product })
})

app.post('/products/:productId/seller', async (req, res) => {
  const product = await ProductDatabase.find(req.params.productId)
  const seller = await sellerDatabase.find(req.query.sellerId)

  await ProductDatabase.update(product)

  res.send(flatted.stringify(product))
})

app.listen(3000, () => {
  console.log('started listening on 3000')
})
