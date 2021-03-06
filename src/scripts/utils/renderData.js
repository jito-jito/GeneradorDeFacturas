let templates = {
    Loading: function (element) {
        return (
            `<div class="lds-facebook"><div></div><div></div><div></div></div>`
        )
    },
    Product: function (element) {
        return (
            `<div class="products-item">
                <figure>
                    <img src=${element.photo} alt="">
                </figure>
                <p>${element.nombre}</p>
                <p>$<span>${element.valor}</span></p>
            </div>`
        )
    },
    Invoice: function (element) {
        return (
            `<tr class="table-row item" data-id=${element.id}>
                <td class="table-cell delete"><img src="./assets/images/delete.svg" alt=""></td>
                <td class="table-cell name">${element.name}</td>
                <td class="table-cell">${element.count}</td>
                <td class="table-cell">$${element.value}</td>
                <td class="table-cell">$${element.totalValue}</td>
            </tr>`
        )
    },
    Discount: function (element) {
        return (
            `<tr class="table-row--discount" data-id=${element.id}>
                <td class="table-cell delete"><img src="./assets/images/delete.svg" alt=""></td>
                <td class="table-cell--discount">${element.nombre}</td>
                <td class="table-cell--discount">${element.percentage}%</td>
            </tr>`
        )
    }

}

function chooseTemplate(templateName) {
    let template
    switch(templateName) {
        case 'loading' :
            template = templates.Loading
            break;
        case 'product' :
            template = templates.Product
            break;
        case 'invoice' :
            template = templates.Invoice
            break;
        case 'discount' :
            template = templates.Discount
            break;
    }

    return ( template )
}

function parseData(array, templateName) {
    let template = chooseTemplate(templateName)
    
    let HTMLString = array.map((element) => {
      return ( template(element) )
    })
  
    return HTMLString
}

function removeChilds(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function insertHTML(arrayHTML, node) {
    arrayHTML.forEach((element) => {
        node.insertAdjacentHTML("beforeend", element)
    })

}


function addHTMLData(data, template, container) {
    //debugger
    let arrayHTMLString = parseData(data, template)
    insertHTML(arrayHTMLString, container)

}

function replaceHTMLData(data, node) {
    node.textContent = data
}

function addListeners(elements, listener, fn) {
    elements.forEach((element) => element.addEventListener(listener, fn))
}


export { addHTMLData, replaceHTMLData, addListeners, removeChilds }