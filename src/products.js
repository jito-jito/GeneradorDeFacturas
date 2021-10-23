import { searchPhoto } from "./scripts/utils/unsplash";



async function loadPhotosInProducts(data) {
    let newData = []
    
    for (let product of data) {
        let photoURL = await getPhotoByName(product.nombre)
        let newProduct = {
            ...product,
            photo: photoURL
        }
        newData.push(newProduct)
    }    
    
    // This code isn't functioning 

    // data.map((product) => {
    //     let photoURL = await getPhotoByName(product.nombre)

    //     return {
    //         ...product,
    //         photo: photoURL
    //     }
    // })
    return newData
}

async function getPhotoByName(name) {
    let photoResult = await searchPhoto(name)
    let photoURL = photoResult.response.results[0].urls.raw
    let photoConfig = "&fit=crop&w=70&h=70"
    return photoURL + photoConfig

}



export { loadPhotosInProducts }