let templates = {
    Product: function (element) {
        return (
            `<figure class="products-item">
                <p>${element.nombre}</p>
                <span>${element.valor}</span>
            </figure> `
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