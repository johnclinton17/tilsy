// (function() {
//   'use strict';

//   var app = {
//     spinner: document.querySelector('.loader')
//   };

//   var container = document.querySelector('.container');


//   // Get Commit Data from Github API
//   function fetchCommits() {
	  
//     var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';

//     $.ajax({
//     method: "GET",
//     url: url,
  
//     })
//   .success(function( response ) {

    
//     response.forEach(function(item){
//       var msg = "<section id='card' class='card'><h4> Message: " + item.commit.message + "</h4><h4> Author: " + item.commit.author.name + "</h4><h4> Time committed: " + (new Date(item.commit.author.date)).toUTCString() +  "</h4><h4><a href='" + item.html_url + "'>Click me to see more!</a>"  + "</h4></section>";
//         $('#appendHere').append(msg);
//     })

//         app.spinner.setAttribute('hidden', true); //hide spinner
//       })
//       // .catch(function (error) {
//       //   console.error(error);
//       // });
//   };



//   var address , i,j,k, x= "";
//     address={
//         "details":[{ "image" : "images/ford.jpg" ,"name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },{ "image" : "images/ford.jpg" ,"name":"BMW", "models":[ "320", "X3", "X5" ] },{ "image" : "images/ford.jpg" ,"name":"Fiat", "models":[ "500", "Panda" ] } 
//         ] 
//       };
        


//     for (var i in address.details)
//         { 
//           x += '<img src= "' + address.details[i].image + '">'; 
//            x +=  "<h2> Car Name :"  + address.details[i].name +  "</h2>";
//           for (j in address.details[i].models) {   x += "<h4> Model Name :" + address.details[i].models[j] + "</h4>"  ; 

//              }
           
//            document.getElementById("card").innerHTML = x;
//         }




//   fetchCommits();


  

        
    
    

// })();

(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');
  var commitContainer = ['.first', '.second', '.third', '.fourth', '.fifth'];
  var posData = ['first', 'second', 'third', 'fourth', 'fifth'];

  // Check that localStorage is both supported and available
  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  // Get Commit Data from Github API
  function fetchCommits() {
    var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';

    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        console.log("Response from Github", response);

        var commitData = {};

        for (var i = 0; i < posData.length; i++) {
          commitData[posData[i]] = {
            message: response[i].commit.message,
            author: response[i].commit.author.name,
            time: response[i].commit.author.date,
            link: response[i].html_url
          };
        }

        localStorage.setItem('commitData', JSON.stringify(commitData));

        for (var i = 0; i < commitContainer.length; i++) {

          container.querySelector("" + commitContainer[i]).innerHTML = 
          "<h4> Message: " + response[i].commit.message + "</h4>" +
          "<h4> Author: " + response[i].commit.author.name + "</h4>" +
          "<h4> Time committed: " + (new Date(response[i].commit.author.date)).toUTCString() +  "</h4>" +
          "<h4>" + "<a href='" + response[i].html_url + "'>Click me to see more!</a>"  + "</h4>";

        }

        app.spinner.setAttribute('hidden', true); // hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Get the commits Data from the Web Storage
  function fetchCommitsFromLocalStorage(data) {
    var localData = JSON.parse(data);

    app.spinner.setAttribute('hidden', true); //hide spinner

    for (var i = 0; i < commitContainer.length; i++) {

      container.querySelector("" + commitContainer[i]).innerHTML = 
      "<h4> Message: " + localData[posData[i]].message + "</h4>" +
      "<h4> Author: " + localData[posData[i]].author + "</h4>" +
      "<h4> Time committed: " + (new Date(localData[posData[i]].time)).toUTCString() +  "</h4>" +
      "<h4>" + "<a href='" + localData[posData[i]].link + "'>Click me to see more!</a>"  + "</h4>";

    }
  };

  if (storageAvailable('localStorage')) {
    if (localStorage.getItem('commitData') === null) {
      /* The user is using the app for the first time, or the user has not
       * saved any commit data, so show the user some fake data.
       */
      fetchCommits();
      console.log("Fetch from API");
    } else {
      fetchCommitsFromLocalStorage(localStorage.getItem('commitData'));
      console.log("Fetch from Local Storage");
    }   
  }
  else {
    toast("We can't cache your app data yet..");
  }


  document.getElementById('butRefresh').addEventListener('click', function() {
    // Get fresh, updated data from GitHub whenever you are clicked
    toast('Fetching latest data...');
    fetchCommits();
    console.log("Getting fresh data!!!");
});

  
})();

