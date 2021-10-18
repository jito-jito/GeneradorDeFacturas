import { addHTMLData, replaceHTMLData } from "./utils/renderData"
import { toggleModal } from "./modals"


const invoiceTable = document.querySelector('.table-products > tbody')
const discountTable = document.querySelector('.table-discounts')
const results = document.querySelector('.table-results > span')

const invoiceSend = document.querySelector('.invoice-send')
invoiceSend.addEventListener('click', sendInvoice)

const discountSend = document.querySelector('.invoice-addDiscount')
discountSend.addEventListener('click', addDiscount)

let invoiceData = [];
let cacheProduct = {};
let discountData = [];
let discount = [];
let totalPrice;



function addItem(item) {
    item.id = invoiceData.length + 1
    invoiceData.push(item)

    addHTMLData([item], 'invoice', invoiceTable)
    
    let invoiceItem = invoiceTable.querySelector('.item:last-child > .delete')
    invoiceItem.addEventListener('click', removeItem)
    calculate()
   

}

function addItemInCache(e) {
    e.stopPropagation()
    let thisToggleModal = toggleModal.bind(this, e)
    thisToggleModal()

    let name = this.querySelector('p').textContent
    let value = parseInt(this.querySelector('span').textContent)

    cacheProduct = {
        id: Number,
        name: name,
        value: value,
        totalValue: Number,
        count: Number,
        delete: false
    }

}

function removeItem(e) {
    let idItem = this.parentElement.dataset.id
    this.parentElement.remove()

    let findIndex = invoiceData.findIndex((data) => data.id == idItem)
    invoiceData[findIndex].delete = true

    let newInvoiceData = invoiceData.filter((data) => !data.delete)
    invoiceData = newInvoiceData
    calculate()
}


function addDiscount(e) {
    e.preventDefault()
    let inputData = this.parentNode.querySelector('input').value
    let discuntIndex = discountData.findIndex((element) => element.nombre == inputData)
    discount.push(discountData[discuntIndex])
    //debugger
    if (discuntIndex === -1) {
        console.log('no discount')    
    } else {
        addHTMLData([discountData[discuntIndex]], 'discount', discountTable)
        calculate()
        let discountItem = discountTable.querySelector('.table-row--discount:last-child > .delete')
        discountItem.addEventListener('click', removeDiscount)
    }  
    
    
}

function removeDiscount(e) {
    let idItem = this.parentElement.dataset.id
    this.parentElement.remove()

    let findIndex = discount.findIndex((data) => data.nombre == idItem)
    discount[findIndex] = {...discount[findIndex], delete: true}
        


    //debugger
    let newDiscountData = discount.filter((data) => !data.delete === true)
    discount = newDiscountData
    calculate()
}

function calculate() {
    let totalInvoice = 0;

    invoiceData.forEach((data) => {
        totalInvoice += data.totalValue
    })

    if(discount.length >= 1 && invoiceData.length >= 1) {

        
        totalInvoice = totalInvoice - ((totalInvoice * discount[0].percentage) / 100)
    }
    
    

    replaceHTMLData(totalInvoice, results)
}

function sendInvoice(e) {
    //e.preventDefault()
    alert('aquí se devería imprimir la factura!!!, se reiniciará todo..')
    invoiceData = []
}



export { invoiceData, addItem, addItemInCache, discountData, cacheProduct }





