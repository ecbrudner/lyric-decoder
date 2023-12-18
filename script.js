var songInputEl= document.getElementById("song-input");
var lyricOutputEl= document.getElementById("lyric-output");
var wordInputEl= document.getElementById("word-input");
var definitionOutputEl= document.getElementById("lyric-definition");
var songSearchButton= document.getElementById("song-search");
var wordSearchButton= document.getElementById("word-search");
var songNameInput= document.getElementById("song-name");
// var wordInput= document.getElementById("word-choice");
var albumArtEl= document.getElementById("album-art");
var savedSongsEl= document.getElementById("saved-songs");
var savedWordsEl= document.getElementById("saved-words");

//add functionality to save song searches to local storage in buttons
//check if song already in local storage
function songButtonExists(title){
    var existingButtons= document.getElementsByClassName("saved-song-button");
    for (var i=0; i<existingButtons.length; i++){
        if (existingButtons[i].innerHTML===title){
            return true;
        }
    } 
    return false;
}

// //check if word already in local storage
function wordButtonExists(word){
     var existingWordButtons= document.getElementsByClassName("saved-word-button");
     for (var i=0; i<existingWordButtons.length; i++){
         if (existingWordButtons[i].innerHTML===word){
             return true;
         }
     } 
     return false;
 }

//user enters song name and lyrics are displayed
songSearchButton.addEventListener("click", getLyrics);

async function getLyrics(){
    //use track.search to get track_id and album art url
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
        var albumArtUrl= resultObj.hits[0].result.header_image_thumbnail_url;
        console.log(albumArtUrl);
        var title= resultObj.hits[0].result.title;
        console.log(title);
        var searchedSong= {
            trackId: trackId,
            albumArtUrl: albumArtUrl,
            title: title
        };

        //save searched song to local storage
        localStorage.setItem("searchedSong", JSON.stringify(searchedSong));

        //check if button with same song name already exists
        if (!songButtonExists(title)){
        
            //create button for searched song
            var savedSongButton= document.createElement("button");
            savedSongButton.innerHTML= title;
            savedSongButton.setAttribute("class", "saved-song-button");

            //append button to savedSongsEl
            savedSongsEl.appendChild(savedSongButton);

            //when button is clicked, run getWeather function
            savedSongButton.addEventListener("click", function(){
                songNameInput.value= title;
                getLyrics();
            });
        }

        //display album art
        albumArtEl.innerHTML="";
        var albumArt=document.createElement("img");
        albumArt.setAttribute("src", albumArtUrl);
        albumArtEl.appendChild(albumArt);


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
            console.log(lyricOutputEl.innerHTML);
            
           
        } catch (error) {
	        console.error(error);
        }

    } catch (error) {
	    console.error(error);
    }  
}

//add functionality to save song searches to local storage in buttons

//user enters word from lyrics and definition is displayed 
wordSearchButton.addEventListener("click", getDefinition);

async function getDefinition () {
    var word= wordInputEl.value.toLowerCase();
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
        var resultObj3= JSON.parse(result);
        console.log(resultObj3);

    //display definition: need to create for loop to loop through all definitions
    //create condition that thumbs up is greater than thumbs down

        definitionOutputEl.textContent="";
        for (i=0; i<10; i++) {
            var wordDefinition= resultObj3.list[i].definition;
            var thumbsUp= resultObj3.list[i].thumbs_up;
            var thumbsDown= resultObj3.list[i].thumbs_down;
            var word= resultObj3.list[i].word;

            if (thumbsUp > thumbsDown) {
                console.log(wordDefinition);
                var wordDefinitionEl= document.createElement("div");
                wordDefinitionEl.textContent= wordDefinition;
                wordDefinitionEl.setAttribute("class", "definition-block");
                definitionOutputEl.appendChild(wordDefinitionEl);
            }
        }

        var searchedWord= {
            wordDefinition: wordDefinition,
            word: word
        };

        //save searched song to local storage
        localStorage.setItem("searchedWord", JSON.stringify(searchedWord));

        //check if button with same song name already exists
        if (!wordButtonExists(word)){
        
            //create button for searched song
            var savedWordButton= document.createElement("button");
            savedWordButton.innerHTML= word;
            savedWordButton.setAttribute("class", "saved-word-button");

            //append button to savedSongsEl
            savedWordsEl.appendChild(savedWordButton);

            //when button is clicked, run getWeather function
            savedWordButton.addEventListener("click", function(){
                wordInput.value= word;
                getDefinition();
            });
        }

    } catch (error) {
	console.error(error);
    }

}
