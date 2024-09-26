const apiKey = '4wl8vqMgJa4ft83XPDKlQ0sFnf1GFol1PqooxmVhTF2zu1tBOJYKApZZ';
const apiUrl = 'https://api.pexels.com/v1/search?query=';
const queries = { hamsters: "islands", anime: "sunset" };

const updateImages = (photos) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
        const img = card.querySelector("img");
        const text = card.querySelector(".text-muted");
        
        if (photos[i]) {
            img.src = photos[i].src.medium;
            img.style.height = "250px";
            img.classList.add("object-fit-cover");
            text.innerText = `Photo ID: ${photos[i].id}`;
        }
    });
};

const loadImages = (query) => {
    fetch(apiUrl + query, { headers: { Authorization: apiKey } })
        .then(response => response.ok ? response.json() : Promise.reject("Error fetching images"))
        .then(data => updateImages(data.photos))
        .catch(err => console.log("Error:", err));
};

document.getElementById("loadImages").addEventListener("click", () => loadImages(queries.hamsters));
document.getElementById("loadOtherImages").addEventListener("click", () => loadImages(queries.anime));

document.getElementById("searchButton").addEventListener("click", () => {
    const searchQuery = document.getElementById("searchInput").value.trim();
    if (searchQuery) {
        loadImages(searchQuery);  
    } else {
        console.log("Please enter a valid search term.");
    }
});