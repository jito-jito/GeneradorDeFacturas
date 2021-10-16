const amountModal = document.querySelector('.amount-modal')
const cancelModal = amountModal.querySelector('.amount-cancel')
const body = document.querySelector('body')

const invoiceModal = document.querySelector('.invoice-main')
const invoiceMenu = document.querySelector('.invoice-menu')

let isOpen = false;


cancelModal.addEventListener('click', toggleModal)
invoiceMenu.addEventListener('click', toggleModal)

function toggleModal(e) {
    e.stopPropagation()
    e.preventDefault()
    let isInvoice = this.classList.contains('invoice-menu')
    let isAmount =  this.classList.contains('products-item')

    if(isInvoice) {
        console.log('isInvoice')
        invoiceModal.classList.toggle('open')
    } else if(isAmount) {
        console.log('isAmount')
        amountModal.classList.toggle('open')
        
    } else {
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

export { toggleModal }

