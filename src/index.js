const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK']

function getShoppingCart(ids, productsList) {
  // Get products on cart
  const productsOnCart = productsList.filter(({ id }) => ids.includes(id))

  // Set cart object
  let cart = {
    products: [],
    promotion: '',
    totalPrice: 0,
    discountValue: 0,
    discount: 0,
  }

  /// Set products
  cart.products = Object.keys(productsOnCart).map((id) => ({
    name: productsOnCart[id].name,
    category: productsOnCart[id].category,
  }))

  // Set number of categories of items in cart
  let productsCategories = []
  cart.products.forEach((element) => {
    let category = element.category

    if (!productsCategories.includes(category)) {
      productsCategories.push(category)
    }
  })

  // Set cart promotion
  cart.promotion = promotions[productsCategories.length - 1]

  // Set total price and discount value
  Object.keys(productsOnCart).map((id) => {
    let price = productsOnCart[id].regularPrice

    Object.keys(productsOnCart[id].promotions).map((key) => {
      if (productsOnCart[id].promotions[key].looks.includes(cart.promotion)) {
        price = productsOnCart[id].promotions[key].price
        cart.discountValue +=
          productsOnCart[id].regularPrice -
          productsOnCart[id].promotions[key].price
      }
    })
    cart.totalPrice += price
  })

  // Set discount percentage
  cart.discount =
    (cart.discountValue / (cart.totalPrice + cart.discountValue)) * 100

  // Round values
  cart.totalPrice = cart.totalPrice.toFixed(2)
  cart.discountValue = cart.discountValue.toFixed(2)
  cart.discount = `${cart.discount.toFixed(2)}%`

  // Return cart object
  return cart
}

module.exports = { getShoppingCart }
