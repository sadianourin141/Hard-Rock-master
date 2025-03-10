document.getElementById('input-btn').addEventListener('click', function() {
    const searchText = document.getElementById('songInput').value;


    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data =>
            displaySong(data.data))
        .catch(error => displayError('Something Went Wrong Please try again later!!'))


})
const displaySong = songs => {
    const div = document.getElementById('div')
    div.innerHTML = ``
    document.getElementById('errorMsg').innerText = ''
    songs.forEach(song => {


        const newDiv = document.createElement('div')
        newDiv.className = 'single-result row align-items-center my-3 p-3'
        newDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
  <source src="${song.preview}" type="audio/mpeg">
</audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onClick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>

        `
        div.appendChild(newDiv);

    });

}
const getLyrics = (artist, title) => {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError('Something Went Wrong Please try again later!!'))


}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyricsDiv');
    lyricsDiv.innerText = `${lyrics}`
}

const displayError = error => {

    document.getElementById('errorMsg').innerText = error;
}