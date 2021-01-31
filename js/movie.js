const main = document.querySelector('main');
function showDeatiledMovieInfo() {
    fetch(`http://www.omdbapi.com/?i=${document.URL.split('?')[1]}&apikey=18feb351&plot=full`)
        .then((response) => response.json())
        .then((data) => {
            let ratings = data.Ratings.map((rating) => {
                return `<div class="rating-source">
                            <h5 class="rating-source-name">${rating.Source}</h5>
                            <span class="raing-value">${rating.Value}</span>
                        </div>`;
            });
            console.log(data);
            main.innerHTML = `
                    <div class="movie">
                    <div class="movie-poster">
                        <img src=${data.Poster} alt="Movie poster" class="movie-poster-image">
                    </div>
                    <div class="movie-details">
                        <h3 class="movie-title">${data.Title}</h3>
                        <p class="movie-release-date"><span>Relesed date: </span>${data.Released}</p>
                        <p class="movie-rated"><span>Rated: </span>${data.Rated == 'N/A' ? 'Not Allowed' : data.Rated}</p>
                        <p class="movie-runtime"><span>Movie runtime: </span>${data.Runtime}</p>
                        <p class="movie-actors"><span>Actors: </span>${data.Actors}</p>
                        <p class="movie-awards"><span>Awards: </span>${data.Awards == 'N/A' ? 'Not Allowed' : data.Awards}</p>
                        <p class="movie-box-office"><span>Box office: </span>${data.BoxOffice == 'N/A' ? 'Not Allowed' : data.BoxOffice}</p>
                        <p class="movie-country"><span>Country: </span>${data.Country}</p>
                        <p class="movie-director"><span>Director: </span>${data.Director == 'N/A' ? 'Not Allowed' : data.Director}</p>
                        <p class="movie-genre"><span>Movie genre: </span>${data.Genre}</p>
                        <p class="movie-lang"><span>Movie language: </span>${data.Language}</p>
                        <p class="movie-metascore"><span>Movie metascore: </span>${data.Metascore == 'N/A' ? 'Not Allowed' : data.Metascore}</p>
                        <p class="movie-plot"><span>Movie plot: </span>${data.Plot}</p>
                        <p class="movie-production"><span>Production: </span>${data.Production == 'N/A' ? 'Not Allowed' : data.Production}</p>
                        <div class="movie-ratings">
                            <span>Movie ratings: </span>
                            <div class="ratings">
                                ${ratings.join('')}
                            </div>
                        </div>
                        <span class="movie-website">Website: </span><a href=${data.Website == 'N/A' ? '#' : data.Website}>${data.Website == 'N/A' ? 'Not Allowed' : data.Website}</a>
                        <p class="movie-writer"><span>Movie writer: </span>${data.Writer}</p>
                        <p class="imdb-votes"><span>IMDB votes: </span>${data.imdbVotes}</p>
                    </div>
                </div>`;
        });
}
showDeatiledMovieInfo();
