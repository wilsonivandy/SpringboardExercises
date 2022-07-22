"use strict";

const $showsList = $("#shows-list");
const $episodesList = $("#episodes-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchTerm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  let shows =  [];
  for(let i=0; i<response.data.length; i++){
    let res = response.data[i].show
    if (res.image == null) {
      res.image = "https://tinyurl.com/missing-tv";
    };
    shows.push(res);
  };
  return shows;
};


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img class="card-img-top" src="${show.image.original}">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  console.log(term);
  const shows = await getShowsByTerm(term);
  $("#search-query").val("");
  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  return response.data.map(e => ({
    id: e.id,
    name: e.name,
    season: e.season,
    number: e.number,
  }));
 }

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  $episodesList.empty();
  for(let episode of episodes){
    const $item = $(
      `<li>
       ${episode.name}
       (season ${episode.season}, episode ${episode.number})
     </li>
    `);
    $episodesList.append($item);
  }
  $episodesArea.show();
}

async function displayEpisodes(evt){
  const getID = $(evt.target).closest(".Show").data("show-id");
  const episodes = await getEpisodesOfShow(getID);
  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", displayEpisodes);
