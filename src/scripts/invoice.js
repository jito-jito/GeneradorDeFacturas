import { addHTMLData, replaceHTMLData } from "./renderData";

const invoiceTable = document.querySelector('.table-products > tbody')
const discountTable = document.querySelector('.table-discounts')
const results = document.querySelector('.table-results > span')

const invoiceSend = document.querySelector('.invoice-send')
invoiceSend.addEventListener('click', sendInvoice)

const discountSend = document.querySelector('.invoice-addDiscount')
discountSend.addEventListener('click', addDiscount)

let invoiceData = [];
let discountData = [];
let totalPrice;


function addItem(item) {
    item.id = invoiceData.length + 1
    invoiceData.push(item)

    addHTMLData([item], 'invoice', invoiceTable)
    
    let invoiceItem = invoiceTable.querySelector('.item:last-child > .delete')
    invoiceItem.addEventListener('click', removeItem)
    calculate()
   

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

    //debugger
    if (discuntIndex === -1) {
        console.log('no discount')    
    } else {
        addHTMLData([discountData[discuntIndex]], 'discount', discountTable)
        calculate(discountData[discuntIndex].percentage)
        let discountItem = discountTable.querySelector('.table-row--discount:last-child > .delete')
        discountItem.addEventListener('click', removeItem)
    }
    console.log('discount '+ discuntIndex)
    
    
    
}

function calculate(discount) {
    let totalInvoice = 0;

    invoiceData.forEach((data) => {
        totalInvoice += data.totalValue
    })

    if(discount) {
        totalInvoice = ((totalInvoice * discount) / 100) - totalInvoice
    }
    
    

    replaceHTMLData(totalInvoice, results)
}

function sendInvoice(e) {
    //e.preventDefault()
    alert('aquí se devería imprimir la factura!!!, se reiniciará todo..')
    invoiceData = []
}



export { invoiceData, addItem, discountData }