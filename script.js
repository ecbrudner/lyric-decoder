var songInputEl= document.getElementById("song-input");
var lyricOutputEl= document.getElementById("lyric-output");
var wordInputEl= document.getElementById("word-input");
var definitionOutputEl= document.getElementById("definition-output");
var songSearchButton= document.getElementById("song-search");
var wordSearchButton= document.getElementById("word-search");
var songNameInput= document.getElementById("song-name");
var wordInput= document.getElementById("word-choice");

//user enters song name and lyrics are displayed
songSearchButton.addEventListener("click", getLyrics);

function getLyrics(){
    //use track.search to get track_id
    var songName= songNameInput.value;
    var getTrackId="https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + songName + "&apikey=2be841372ae6b4bf6b34181f81863d2c";
    console.log(getTrackId);

    // fetch(getTrackId)
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    //     console.log(data);
        //need to define track_id in a variable
        //use track.lyrics.get to get lyrics from track_id
    // })
    // .catch(function(error){
    //     console.log(error);
    // });

}

//user enters word from lyrics and definition is displayed 
wordSearchButton.addEventListener("click", getDefinition);

async function getDefinition () {
    var word= wordInput.value;
    const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + word;
    const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': '6e80b305f6mshb4c48ce28d66fabp1ee768jsn39199b79955f',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.text();
	    console.log(result);
    } catch (error) {
	console.error(error);
    }

}
