import './styles/global.scss'

import { getData } from './scripts/utils/db'
import { addHTMLData, addListeners } from './scripts/utils/renderData'
import { discountData, addItemInCache } from './scripts/invoice'
import { loadPhotosInProducts } from './products'

const productsBox = document.querySelector('.products-container')


async function init() {

  let data = await getData('Products')
  let dataWithPhotos = await loadPhotosInProducts(data)
  discountData = await getData('Discounts')
  addHTMLData(dataWithPhotos, 'product', productsBox)
  
  let products = productsBox.querySelectorAll('.products-item')
  addListeners(products, 'click', addItemInCache)


  

}

init()