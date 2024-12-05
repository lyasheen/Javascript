fetch('https://js-dynamic-portfolio-data-makerslab-emlyon-cdweb-8f83155c64a0cc.gitlab.io/json/menuiserie.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        return response.json();
    })
    .then(data => {
        createdPage(data);
       console.log(data);
       
    })
    .catch(error => console.error('Error:', error));
    
    function createHtmlElement(element, content, parent) {
        let htmlElement = document.createElement(element);
        if (element === "img") {
            htmlElement.src = content;
        }
        else {
            htmlElement.textContent = content;
        }
        parent.appendChild(htmlElement);
        return htmlElement;
    }

    let header = document.getElementsByTagName("header")[0];
    let promesseClient = document.getElementsByTagName("section")[0];
    let realisations = document.getElementsByTagName("section")[1];
    let temoignages = document.getElementsByTagName("section")[2];

    function createHeader(data){
        let div = createHtmlElement("div", null, header)
        createHtmlElement("h1", data.entreprise, div);
        createHtmlElement("h2", data.propositionDeValeur, div);
        createHtmlElement("button", data.texteBouton, header);
        }

    function createdPage(data) {
        createHeader(data);
        for (let i = 0; i < data.promessesClients.length; i++) {
            createHtmlElement("p", data.promessesClients[i], promesseClient);
        }
        for (let i = 0; i < data.realisations.length; i++) {
            let dataRealisations = data.realisations[i];
            let divRealisations = createHtmlElement("div", null, realisations);
            createHtmlElement("img", dataRealisations["image-url"],  divRealisations);
            let columnRight = createHtmlElement("div", null, divRealisations);
            createHtmlElement("h3", dataRealisations.titre, columnRight);
            createHtmlElement("p", dataRealisations.description, columnRight);
        }
        let divTemoignages = createHtmlElement("div", null, temoignages); // bien la mettre à l'exterieur pour que ça ne créer pas de div sur chacune
        for (let i = 0; i < data.temoignages.length; i++) {
            let dataTemoignages = data.temoignages[i];
            let divCards = createHtmlElement("div", null, divTemoignages);
            createHtmlElement("h1", dataTemoignages.prenom, divCards);
            createHtmlElement("p", dataTemoignages.typePrestation, divCards);
            createHtmlElement("p", dataTemoignages.commentaire, divCards);
            createHtmlElement("h3", dataTemoignages.note, divCards)
        }
    }