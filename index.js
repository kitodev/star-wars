var BASE_URL = "https://swapi.dev/api/";
var FilmRepository = /** @class */ (function () {
    function FilmRepository(baseUrl) {
        this.baseUrl = baseUrl + "/films";
    }
    FilmRepository.prototype.get = function (id) {
        if (id === void 0) { id = null; }
        var url = this.baseUrl + (id === null ? "" : "/".concat(id));
        return fetch(url).then(function (data) { return data.json(); });
    };
    return FilmRepository;
}());
var createFilmCard = function (film) {
    // const vehicleTable = document.createElement("div");
    // vehicleTable.classList.add("vehicle-table");
    var card = document.createElement("div");
    card.classList.add("card");
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            var selectedCard = document.querySelector('.selected');
            if (selectedCard) {
                selectedCard.classList.remove('selected');
            }
            for (var _i = 0, _a = Object.keys(film.vehicles); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = film.vehicles[key];
                console.log(key, value);
            }
            card.classList.add('selected');
            //vehicleTable.style.display = 'table';
        });
    });
    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    var cardleftCorner = document.createElement("div");
    cardleftCorner.classList.add("card-left-corner");
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    var cardText = document.createElement("div");
    cardText.classList.add("card-text");
    var cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardleftCorner);
    card.appendChild(cardHeader);
    card.appendChild(cardText);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    var date = new Date("".concat(film.release_date));
    var year = date.getFullYear();
    cardleftCorner.innerHTML = toRomanNumeral(year);
    cardHeader.innerHTML = film.title;
    cardText.innerHTML = "Release date: ".concat(film.release_date);
    cardBody.innerHTML = film.opening_crawl;
    cardFooter.innerHTML = "Director: ".concat(film.director);
    return card;
};
var toRomanNumeral = function (num) {
    var romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var result = '';
    for (var key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            result += key;
            num -= romanNumerals[key];
        }
    }
    return result;
};
var filmRepo = new FilmRepository(BASE_URL);
filmRepo.get().then(function (res) {
    var cardsContainer = document.getElementById("cards-container");
    var films = res.results;
    films.sort(function (a, b) { return a.episode_id - b.episode_id; });
    console.log("films", films);
    films.forEach(function (e) { return cardsContainer.appendChild(createFilmCard(e)); });
});
