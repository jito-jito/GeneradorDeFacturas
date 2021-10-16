let templates = {
    Product: function (element) {
        return (
            `<figure class="products-item">
                <p>${element.nombre}</p>
                <span>${element.valor}</span>
            </figure> `
        )
    },
    Invoice: function () {
        return (
            `<tr class="table-row">
                <td class="table-cell"><img src="./assets/images/delete.svg" alt=""></td>
                <td class="table-cell">${element.name}</td>
                <td class="table-cell">${element.amount}</td>
                <td class="table-cell">${element.value}</td>
                <td class="table-cell">${element.totalValue}</td>
            </tr>`
        )
    },
    Discount: function () {
        return (
            `<tr class="table-row--discount">
                <td class="table-cell"><img src="./assets/images/delete.svg" alt=""></td>
                <td class="table-cell--discount">${element.name}</td>
                <td class="table-cell--discount">${element.percentage}</td>
            </tr>`
        )
    }

}

function chooseTemplate(templateName) {
    let template
    switch(templateName) {
        case 'product' :
            template = templates.Product
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

function insertHTML(arrayHTML, node) {
    arrayHTML.forEach((element) => {
        node.insertAdjacentHTML("beforeend", element)
    })

}

export { parseData, insertHTML }