const form = document.querySelector("#form");
const search = document.querySelector("#search");
const result = document.querySelector("#result");
const more = document.querySelector("#more");

const apiURL = "https://api.lyrics.ovh";

// search songs
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// show song in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
    ${data.data
      .map(
        (song) => `
    <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button 
            class="btn" 
            data-artist="${song.artist.name}"
            data-songtitle="${song.title}"
        >Get Lyrics</button>
    </li>`
      )
      .join("")}
    </ul>
  `;
}

// get more songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// get Lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;

  more.innerHTML = "";
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (!searchTerm) {
    alert("Please type in search term");
  } else {
    searchSongs(searchTerm);
  }
});

// get lyrics button click
result.addEventListener("click", (e) => {
  const clickEl = e.target;
  // console.log(clickEl)
  if (clickEl.tagName === "BUTTON") {
    const artist = clickEl.getAttribute("data-artist");
    const songTitle = clickEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
