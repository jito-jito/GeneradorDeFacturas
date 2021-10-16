import { getData } from './db'
import { parseData, insertHTML } from './renderData'
import { toggleModal } from './modals'

const productsBox = document.querySelector('.products-container')

function addListeners(elements, listener, fn) {
  elements.forEach((element) => element.addEventListener(listener, fn))
}

function addProduct(e) {
  e.stopPropagation()
  let thisToggleModal = toggleModal.bind(this, e)
  thisToggleModal()


}

async function init() {

  let data = await getData('Products')
  let HTMLData = parseData(data, 'product')
  insertHTML(HTMLData, productsBox)

  let products = productsBox.querySelectorAll('.products-item')

  addListeners(products, 'click', addProduct)


  
  // console.log(productsBox)
  // console.log(data)
  // console.log(HTMLData)
}

init()
