import { getData } from './db'
import { parseData, insertHTML } from './renderData'
import { toggleModal, cacheProduct } from './modals'
import { invoiceData, addItem } from './invoice'

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
  cacheProduct = {
    name: name,
    value: value,
    count: Number
  }

 
  

}

async function init() {

  let data = await getData('Products')
  let HTMLData = parseData(data, 'product')
  insertHTML(HTMLData, productsBox)

  let products = productsBox.querySelectorAll('.products-item')

  addListeners(products, 'click', addProduct)


  console.log(invoiceData)
  // console.log(productsBox)
  // console.log(data)
  // console.log(HTMLData)
}

init()
