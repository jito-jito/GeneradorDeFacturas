import { createApi } from 'unsplash-js';



const serverApi = createApi({
  accessKey: process.env.ACCESS_KEY,

});

function getPhoto() {
    serverApi.photos.get({ photoId: 'naranja' })
        .then((data) => {
            console.log(data)
        })

}


async function searchPhoto(name) {
    const photo = await serverApi.search.getPhotos({ 
        query: name,
        page: 1,
        perPage: 1,
        lang: "es"
    })
    
    return photo

}

export {getPhoto , searchPhoto}