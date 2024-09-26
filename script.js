const apiKey = '4wl8vqMgJa4ft83XPDKlQ0sFnf1GFol1PqooxmVhTF2zu1tBOJYKApZZ';
const apiUrl = 'https://api.pexels.com/v1/search?query='
const query1 = "hamsters";
const query2 = "anime";
let arraySrc = [];

const getImages = function(query) {
    fetch(apiUrl +query, {
        headers: {
            Authorization: apiKey
        }
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error ("Errore nel recupero delle immagini")
        }
    })
    .then((images) =>{
        console.log(images)
        loadImages(images)
    })
    .catch((err) => {
        console.log("ERRORE", err)
    })
}


const loadImages = (images) => {
    arraySrc = images.photos.map(image => image.src);
};

const updateImages = () => {
    document.querySelectorAll(".card img").forEach((img, i) => {
        img.src = arraySrc[i].original;
        img.style.height = "250px";
        img.classList.add("object-fit-cover");
    });
};

document.getElementById("loadImages").addEventListener("click", () => {
    const img = getImages(query1);
    loadImages(img);
    updateImages();
});

document.getElementById("loadOtherImages").addEventListener("click", () => {
    getImages(query2).then(updateImages);
});