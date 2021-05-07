const Customer = require('./models/customer')
const Seller = require('./models/seller')
const Product = require('./models/product')
const printSelectedOrders = require('./lib/printSelectedOrders')
const {
  customerDatabase,
  sellerDatabase,
  productDatabase,
} = require('./database')

const pasha = Customer.create({ name: 'Pasha', address: 'Baku' })
const kenan = Customer.create({ name: 'Kenan', address: 'Ganja' })

const chuba = Seller.create({ name: 'Chuba' })
const chanel = Seller.create({ name: 'Chanel' })
const cucci = Seller.create({ name: 'Cucci' })

const jeans = Product.create({ name: 'Jeans', price: 50 })
const sweater = Product.create({ name: 'Sweater', price: 65 })
const tShirt = Product.create({ name: 'T-shirt', price: 15 })
const parfum = Product.create({ name: 'Parfum', price: 90 })

pasha.buyProduct(jeans, cucci)
pasha.buyProduct(sweater, chuba)
pasha.buyProduct(tShirt, chanel)
kenan.buyProduct(parfum, chanel)

async function main() {
  try {
    const leyla = Customer.create({ name: 'Leyla', address: 'Karabakh' })

    await customerDatabase.save([kenan, pasha, leyla])

    await sellerDatabase.save([chuba, cucci, chanel])

    await productDatabase.save([jeans, sweater, tShirt, parfum])
    await productDatabase.load()

    const customers = await customerDatabase.load()
    customers.forEach(printSelectedOrders)
  } catch (e) {
    return console.log(e)
  }
}

main()
