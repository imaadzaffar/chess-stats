import axios from 'axios';

let username = 'iszaffar';

console.log(`Chess stats for ${username}`);

const chessApi = axios.create({
  baseURL: 'https://api.chess.com/'
});

const lichessApi = axios.create({
  baseURL: 'https://lichess.org/api/',
  headers: {'Authorization': 'Bearer ' + process.env.REACT_APP_LICHESS_API_TOKEN}
});

// Chess.com
chessApi.get(`/pub/player/${username}/stats`)
  .then(function (response) {
    // handle success
    console.log('--- chess.com');
    //console.log(response)

    var data = response.data;
    var blitz_last = data.chess_blitz.last.rating;
    //var blitz_best = data.chess_blitz.best.rating;
    var rapid_last = data.chess_rapid.last.rating;
    //var rapid_best = data.chess_rapid.best.rating;

    console.log('Blitz: ' + blitz_last);
    console.log('Rapid: ' + rapid_last);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Lichess
lichessApi.get(`https://lichess.org/api/user/${username}/following`)
  .then(response => {
    // handle success
    console.log('*** lichess.org');
    let string_clean = "["+ response.data.replace(/\n/g, ",").slice(0, -1) + "]";
    let friends_data = JSON.parse(string_clean);
    
    friends_data.forEach(item => {
      let username = item.username;
      let online = item.online;
      let blitz = item['perfs']['blitz'];
      let rapid = item['perfs']['rapid'];
      let blitz_rating = blitz.rating;
      let rapid_rating = rapid.rating;

      console.log(username);
      console.log('-- Online: ' + online.toString());
      console.log('-- Blitz: ' + blitz_rating.toString());
      console.log('-- Rapid: ' + rapid_rating.toString());
    });
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });

/* lichessApi.get(`/user/${username}`)
  .then(function (response) {
    // handle success
    console.log('--- lichess.org')
    //console.log(response)

    var data = response.data;
    var blitz = data.perfs.blitz.rating;
    var rapid = data.perfs.rapid.rating;
    var online = data.online

    console.log('Blitz: ' + blitz)
    console.log('Rapid: ' + rapid)
    console.log('Online: ' + online)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  }); */