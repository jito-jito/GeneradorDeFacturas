import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'


const pdfOptions = {
    font1: StandardFonts.TimesRomanItalic,
    font2: StandardFonts.TimesRoman,
    fontSize: 4,
    lineSpace: 2,
    marginLeft: 5 
}

const pdfTextOptions = {
    positionX: 0,
    positionY: 0,
    size:  pdfOptions.fontSize,
    // font: font
}

function calcPageSize(defaultData, invoiceData, discountData) {
    const arrayData = Object.entries(defaultData)
    const lines = arrayData.length + invoiceData.length + discountData.length
    console.log(lines)
    const height = lines * 4.2

    return [70, height]
}

function withOfont(size) {
    return ((size * 2.7) / 6)
}

function drawText(pdfPage, text, font, config) {
    pdfPage.drawText(text, {
        x: config.positionX || pdfTextOptions.positionX,
        y: config.positionY || pdfTextOptions.positionY,
        size:  config.size || pdfTextOptions.size,
        font: font
    })
}

function drawData(pdfPage, font, data) {
    const arrayPdfData = Object.entries(data)
    const { width, height } = pdfPage.getSize()
    pdfTextOptions.positionY = height - pdfOptions.lineSpace
    arrayPdfData.map((element, index) => {
        let fontWidth = element[1].size ?  withOfont(element[1].size) : withOfont(pdfOptions.fontSize)
        element[1].size ? pdfTextOptions.size = element[1].size : pdfTextOptions.size = pdfOptions.fontSize

        if(element[0] != 'Products' && element[0] != 'Discounts') {
            if(element[1].position == 'left') {
                pdfTextOptions.positionX = 0
            }
    
            if(element[1].position == 'center') {
                pdfTextOptions.positionX = (width / 2) - ( (element[1].data.length * fontWidth) / 2)
            }
    
            pdfTextOptions.positionY = pdfTextOptions.positionY - ((element[1].size || pdfOptions.fontSize) +  element[1].marginTop)
            drawText(pdfPage, element[1].data, font.TimesRomanItalic, {
                size: element[1].size || null
            })
    
        }

        
        if(element[0] === 'Products') {
            if (element[1].items.data.length >= 1) {
                pdfTextOptions.positionY = pdfTextOptions.positionY - ( (element[1].ProductsTitle.size || pdfOptions.fontSize) +  element[1].ProductsTitle.marginTop)
                element[1].ProductsTitle.data.map( (text, textIndex) => {
                    let positionX
                    if(element[1].ProductsTitle.position[textIndex] == 'left') {
                        positionX = 5
                    }

                    if(element[1].ProductsTitle.position[textIndex] == 'right') {
                        positionX = width - element[1].ProductsTitle.positionX[textIndex]
                    }
                    
                    drawText(pdfPage, text, font.TimesRoman, {
                        positionX: positionX,
                        size: element[1].ProductsTitle.size || null 
                    })
                })

               

                element[1].items.data.map((item, itemIndex) => {
                    pdfTextOptions.positionY = pdfTextOptions.positionY - ( element[1].items.size || pdfOptions.fontSize )
                    let arrayTexts = [`${item.name}`, `${item.count}`, `$${item.totalValue}`]
                    let arrayPositionsX = [6, 22, 12]
                    
                    for(let i=0; i < 3; i++) {
                        drawText(pdfPage, arrayTexts[i], font.TimesRoman, {
                            positionX: i == 0 ? arrayPositionsX[i] : width - arrayPositionsX[i],
                            size: element[1].items.size || null
                        })
                    }
                   
                  
                 
                })

                
            } 
            
            return
        }

        if(element[0] === 'Discounts') {
            if (element[1].items.data.length >= 1) {
                pdfTextOptions.positionY = pdfTextOptions.positionY - ( (element[1].DiscountsTitle.size || pdfOptions.fontSize) +  element[1].DiscountsTitle.marginTop)
                element[1].DiscountsTitle.data.map( (text, textIndex) => {
                    let positionX
                    if(element[1].DiscountsTitle.position[textIndex] == 'left') {
                        positionX = 5
                    }

                    if(element[1].DiscountsTitle.position[textIndex] == 'right') {
                        positionX = width - element[1].DiscountsTitle.positionX[textIndex]
                    }
                    
                    drawText(pdfPage, text, font.TimesRoman, {
                        positionX: positionX,
                        size: element[1].DiscountsTitle.size || null 
                    })
                })

               

                element[1].items.data.map((item, itemIndex) => {
                    console.log(item)
                    pdfTextOptions.positionY = pdfTextOptions.positionY - ( element[1].items.size || pdfOptions.fontSize )
                    let arrayTexts = [`${item.nombre}`, `${item.percentage}%`]
                    let arrayPositionsX = [6, 12]
                    
                    for(let i=0; i < 2; i++) {
                        drawText(pdfPage, arrayTexts[i], font.TimesRoman, {
                            positionX: i == 0 ? arrayPositionsX[i] : width - arrayPositionsX[i],
                            size: element[1].items.size || null
                        })
                    }
                   
                  
                 
                })

                
            } 
            
            return
        }
        
    })
    
}


async function createPdf(invoiceData, discountData, totalInvoice) {
  const pdfDoc = await PDFDocument.create()
  const TimesRomanItalic = await pdfDoc.embedFont(pdfOptions.font1)
  const TimesRoman = await pdfDoc.embedFont(pdfOptions.font2)
  
  const pdfData = {
    mainTitle: {
        data: 'Generdor de Facturas',
        position: 'center',
        marginTop: 0
    },
    Date: {
        data: `Fecha: ${new Date().toLocaleString()}`,
        position: 'center',
        size: 2,
        marginTop: 0
    },
    Products: {
        ProductsTitle: {
            data: ['Productos:', 'cant', 'total'],
            position: ['left', 'right', 'right'],
            positionX: [5, 24, 12],
            size: 3,
            marginTop: 2
        },
        items: {
            data: invoiceData,
            position: 'invoiceItem',
            size: 3
        },
      
    },
    Discounts: {
        DiscountsTitle: {
            data: ['Descuentos:', '%'],
            position: ['left', 'right'],
            positionX: [5, 12],
            size: 3,
            marginTop: 2
        },
        items: {
            data: discountData,
            position: 'discountItem',
            size: 3
        },
    },
    ResultsTitle: {
        data: `Total Factura: $${totalInvoice}`,
        position: 'center',
        marginTop: 2
    },
    Regards: {
        data: 'gracias por tu compra!',
        position: 'center',
        marginTop: 0
    },
    DevBy: {
        data: 'developed by jito-jito',
        position: 'center',
        size: 2,
        marginTop: 1
    }
  }
  const sizeOfPage= calcPageSize(pdfData, invoiceData, discountData)
  const page = pdfDoc.addPage(sizeOfPage)
  
 
  drawData(page, {TimesRomanItalic, TimesRoman}, pdfData)

  const pdfBytes = await pdfDoc.save()
  console.log('pdf created')
  await download(pdfBytes, "factura.pdf", "application/pdf")
}


export { createPdf }