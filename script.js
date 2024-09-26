const apiKey = '4wl8vqMgJa4ft83XPDKlQ0sFnf1GFol1PqooxmVhTF2zu1tBOJYKApZZ';
const apiUrl = 'https://api.pexels.com/v1/search?query=';
const queries = { hamsters: "islands", anime: "sunset" };

const updateImages = (photos) => {
    document.querySelectorAll(".card img").forEach((img, i) => {
        if (photos[i]) {
            img.src = photos[i].src.medium;
            img.style.height = "250px";
            img.classList.add("object-fit-cover");
        }
    });
};

const loadImages = (query) => {
    fetch(apiUrl + query, { headers: { Authorization: apiKey } })
        .then(response => response.ok ? response.json() : Promise.reject("Error fetching images"))
        .then(data => updateImages(data.photos))
        .catch(err => console.log("Error:", err));
};

// Use one function for both buttons
document.getElementById("loadImages").addEventListener("click", () => loadImages(queries.hamsters));
document.getElementById("loadOtherImages").addEventListener("click", () => loadImages(queries.anime));
