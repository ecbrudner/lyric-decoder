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

async function getLyrics(){
    //use track.search to get track_id
    var songName= songNameInput.value;
    const url1 = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q='+ songName +'&per_page=10&page=1';
    const options1 = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '6e80b305f6mshb4c48ce28d66fabp1ee768jsn39199b79955f',
		    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.text();
	    console.log(result);
        var resultObj= JSON.parse(result);
        console.log(resultObj);
        var trackId= resultObj.hits[0].result.id;
        console.log(trackId);

        //use trackid to get lyrics

        const url2 = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id='+ trackId+'&per_page=10&page=1';
        const options2 = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '6e80b305f6mshb4c48ce28d66fabp1ee768jsn39199b79955f',
		        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	        }
        };

        try {
	        const response = await fetch(url2, options2);
	        const result = await response.text();
	        console.log(result);
            var resultObj2= JSON.parse(result);
            console.log(resultObj2);
            var lyrics= resultObj2.lyrics.lyrics.body.html;
            console.log(lyrics);

            //trim and display lyrics
            lyricOutputEl.innerHTML= lyrics;
            var lyricsText= lyricOutputEl.textContent.trim();
            console.log(lyricsText);

            lyricOutputEl.innerHTML= lyricsText;



        } catch (error) {
	        console.error(error);
        }

        //use track id to get album art
        const url3 = 'https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id='+ trackId +'&per_page=20&page=1';
        const options3 = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '6e80b305f6mshb4c48ce28d66fabp1ee768jsn39199b79955f',
		        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	        }
        };

        try {
	        const response = await fetch(url3, options3);
	        const result = await response.text();
	        console.log(result);

        } catch (error) {
	        console.error(error);
        }

    } catch (error) {
	    console.error(error);
    }  
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
