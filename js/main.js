const resultsContainer = document.querySelector('.result-section');
const searchButton = document.querySelector('.search-btn');
const input = document.querySelector('.search-field');
const loadBtn = document.querySelector('.load-more');
const resultsCount = document.createElement('h2');
resultsCount.classList.add('total-results');

/*
  Функция для получения дополнительных данных про фильм, 
  для получения дополнительных данных определенного фильма нам понадобится ID этого фильма.
  ID фильма мы присваивали тегу <a> в качестве data атрибута (data-id), оттуда и берем ID.
  Функция showDeatiledMovieInfo() берет ID у кликнутого элемента и отправляет API запрос к The Open Movie Database, 
  последний возвращает нам определенные данные определенного фильма.
*/

function searchFilms(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response == 'False' && (data.Error == 'Movie not found!' || data.Error == 'Too many results.')) {
                resultsCount.textContent = data.Error;
                resultsContainer.prepend(resultsCount);
                return false;
            } else {
                resultsCount.textContent = `Founded results: ${data.totalResults}`;
                resultsContainer.prepend(resultsCount);
            }
            let resultsArray = data.Search;
            resultsArray.forEach((movie) => {
                resultsContainer.innerHTML += `
                        <div class="movie-card">
                            <div class="movie-poster-wrapper">
                                <img src=${movie.Poster} alt=${movie.Title + ' image'} class="movie-poster">
                            </div>
                            <p class="movie-title">${movie.Title}</p>
                            <p class="movie-release">${movie.Year}</p>
                            <a href=${'./movie.html?' + movie.imdbID} class="movie-readmore-btn btn" data-id=${movie.imdbID}>Read more</a>
                        </div>`;
            });
            // showDeatiledMovieInfo();
        })
        .catch((err) => {
            console.error(err);
        });
}

/* При клике на кнопку поиска проверяем контейнер для вывода результатов на наличние дочерних элементов, 
   если они есть то удаляем их, а потом вызываем функцию для выполнения API запроса 
   после которого выведутся фильмы которые мы искали.
*/
searchButton.addEventListener('click', () => {
    while (resultsContainer.firstChild) {
        resultsContainer.firstChild.remove();
    }
    let URL = `http://www.omdbapi.com/?S=${input.value}&apikey=18feb351`;
    searchFilms(URL);
});
