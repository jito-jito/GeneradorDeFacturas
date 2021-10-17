import { getData } from './db'
import { addHTMLData, addListeners } from './renderData'
import { toggleModal, cacheProduct } from './modals'
import { invoiceData, addItem, discountData, addItemInCache } from './invoice'

const productsBox = document.querySelector('.products-container')




async function init() {

  let data = await getData('Products')
  discountData = await getData('Discounts')
  addHTMLData(data, 'product', productsBox)
  
  let products = productsBox.querySelectorAll('.products-item')
  addListeners(products, 'click', addItemInCache)



}

init()





