import './styles/global.scss'
import { getData } from './scripts/utils/db'
import { addHTMLData, addListeners, removeChilds } from './scripts/utils/renderData'
import { discountData, addItemInCache } from './scripts/invoice'
import { loadPhotosInProducts } from './products'

const productsBox = document.querySelector('.products-container')



async function init() {

  let data = await getData('Products')
  await addHTMLData(['loading'], 'loading', productsBox)
  let dataWithPhotos = await loadPhotosInProducts(data)
  discountData = await getData('Discounts')
  removeChilds(productsBox)
  addHTMLData(dataWithPhotos, 'product', productsBox)
  // await addHTMLData(data, 'product', productsBox)
  
  let products = productsBox.querySelectorAll('.products-item')
  addListeners(products, 'click', addItemInCache)


  

}

init()



