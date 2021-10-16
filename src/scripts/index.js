import { getData } from './db'
import { addHTMLData } from './renderData'
import { toggleModal, cacheProduct } from './modals'
import { invoiceData, addItem, discountData } from './invoice'

const productsBox = document.querySelector('.products-container')

function addListeners(elements, listener, fn) {
  elements.forEach((element) => element.addEventListener(listener, fn))
}

function addProduct(e) {
  e.stopPropagation()
  let thisToggleModal = toggleModal.bind(this, e)
  thisToggleModal()

  let name = this.querySelector('p').textContent
  let value = parseInt(this.querySelector('span').textContent)
  // debugger
  cacheProduct = {
    id: Number,
    name: name,
    value: value,
    totalValue: Number,
    count: Number,
    delete: false
  }

 
  

}

async function init() {

  let data = await getData('Products')
  discountData = await getData('Discounts')
  console.log(discountData)
  addHTMLData(data, 'product', productsBox)
  
  let products = productsBox.querySelectorAll('.products-item')
  addListeners(products, 'click', addProduct)



}

init()
