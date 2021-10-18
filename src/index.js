import './styles/global.scss'

import { getData } from './scripts/utils/db'
import { addHTMLData, addListeners } from './scripts/utils/renderData'
import { discountData, addItemInCache } from './scripts/invoice'

const productsBox = document.querySelector('.products-container')




async function init() {

  let data = await getData('Products')
  discountData = await getData('Discounts')
  addHTMLData(data, 'product', productsBox)
  
  let products = productsBox.querySelectorAll('.products-item')
  addListeners(products, 'click', addItemInCache)



}

init()