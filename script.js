//user enters song name and lyrics are displayed
//user enters word from lyrics and definition is displayed 

// var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var getApi2 = document.getElementById('get-api2');

// function getApi() {
//   // replace `octocat` with anyone else's GitHub username
//   var requestUrl = 'https://api.musixmatch.com/ws/1.1/';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var listItem = document.createElement('li');
//         listItem.textContent = data[i].html_url;
//         repoList.appendChild(listItem);
//       }
//     });
// }

fetchButton.addEventListener('click', getApi2);

async function getApi2(){
const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=wat';
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
return result;
}

getApi2();