const BASE_URL: string = "https://swapi.dev/api/";

interface IApiResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

interface IVehicles {
    name: string;
    manufacturer: string;
    model: string;
    crew: number;
}

interface IFilm {
    director: string;
    opening_crawl: string;
    release_date: Date;
    title: string;
    episode_id: number;
    vehicles: Array<IVehicles>;
}

class FilmRepository {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl + "/films";
    }

    public get(id: number = null): Promise<IApiResponse<IFilm>> {

        const url = this.baseUrl + (id === null ? "" : `/${id}`);

        return fetch(url).then(data => data.json());
    }
}


const createFilmCard = (film: IFilm) => {
    // const vehicleTable = document.createElement("div");
    // vehicleTable.classList.add("vehicle-table");

    const card = document.createElement("div");
    card.classList.add("card");


    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const selectedCard = document.querySelector('.selected');
        if (selectedCard) {
          selectedCard.classList.remove('selected');
        }
        for (let key of Object.keys(film.vehicles)) {
          let value = film.vehicles[key]
          console.log(key, value);
        }
        card.classList.add('selected');

        //vehicleTable.style.display = 'table';

      })

    });

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const cardleftCorner = document.createElement("div");
    cardleftCorner.classList.add("card-left-corner");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    card.appendChild(cardleftCorner);
    card.appendChild(cardHeader);
    card.appendChild(cardText);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    
    const date = new Date(`${film.release_date}`);
    const year = date.getFullYear();

    cardleftCorner.innerHTML = toRomanNumeral(year);

    cardHeader.innerHTML = film.title;
    cardText.innerHTML = `Release date: ${film.release_date}`;
    cardBody.innerHTML = film.opening_crawl;
    cardFooter.innerHTML = `Director: ${film.director}`;
    

    return card;
};
const toRomanNumeral = (num: number): string => {
    const romanNumerals: Record<string, number> = {
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
  
    let result = '';
  
    for (const key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        result += key;
        num -= romanNumerals[key];
      }
    }
  
    return result;
}
const filmRepo = new FilmRepository(BASE_URL);

filmRepo.get().then(res => {
    const cardsContainer = document.getElementById("cards-container");
    const films: IFilm[] = res.results;
    films.sort((a, b) => a.episode_id - b.episode_id);
    console.log("films", films);
    films.forEach(e => cardsContainer.appendChild(createFilmCard(e)));
})

