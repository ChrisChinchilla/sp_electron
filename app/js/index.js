'use strict';

// Connect to API option
require('dotenv').config();
var md5 = require('md5');
var publicKey = process.env.MARVEL_PUBLIC_KEY;
var privateKey = process.env.MARVEL_PRIVATE_KEY;
var ts = String(new Date().getTime());
var hash = md5(ts+privateKey+publicKey);
var url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=25`;

// Simple option
// var url = `https://gist.githubusercontent.com/ChrisChinchilla/29486e8ce367f426dfe6b15dbcc3fa54/raw/3ea92af51ce3749bb5983c1cb0359883592daef6/Marvel%2520Electron%2520Data`;

var characterHTML = (character)=> `
  <div class="character">
    <h2>${character.name}</h2>
    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" />
  </div>`;

fetch(url)
    .then(resp => resp.json())
    .then(json => json.data.results)
    .then(characters => {
        var html = characters.map(characterHTML).join('');
        var characterList = document.getElementById("character_list");
        characterList.innerHTML = html;

        new Notification(document.title, {
            body: 'Super Heroes Loaded!'
        });
    })
    .catch((error)=> {
        console.error(error);
    })