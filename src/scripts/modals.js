const amountModal = document.querySelector('.amount-modal')
const cancelAmount = amountModal.querySelector('.amount-cancel')
const formAmount = amountModal.querySelector('.amount-form')
const body = document.querySelector('body')

const invoiceModal = document.querySelector('.invoice-main')
const invoiceMenu = document.querySelector('.invoice-menu')

let cacheProduct = {}
let isOpen = false;


cancelAmount.addEventListener('click', function(){amountModal.classList.toggle('open')})
invoiceMenu.addEventListener('click',  function(){invoiceModal.classList.toggle('open')})
formAmount.addEventListener('submit', setAmount)


function toggleModal(e) {
    e.stopPropagation()
    e.preventDefault()
    let isInvoice = this.classList.contains('invoice-menu')
    let isAmount =  this.classList.contains('products-item')
    let isBody = e.target.classList.contains('amount-modal')

    if(isInvoice) {
        console.log('isInvoice')
        invoiceModal.classList.toggle('open')
    } else if(isAmount) {
        console.log('isAmount')
        amountModal.classList.toggle('open')
        
    } else if (isBody) {
        console.log('close all')
        amountModal.classList.remove('open')
        invoiceModal.classList.remove('open')
    }

    isOpen = !isOpen
    closeModal()
    
    
}

function closeModal() {

    if(isOpen) {
        body.addEventListener('click', toggleModal)
    } else {
        body.removeEventListener('click', toggleModal)
    }
}

function setAmount(e) {
    e.preventDefault()
    debugger

    let count = parseInt(this.querySelector('input').value, 10)    
    cacheProduct.count = count
    closeModal()

   
}



export { toggleModal, cacheProduct }

