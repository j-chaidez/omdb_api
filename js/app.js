var app = (function() {
	// create a global movies variable for use in the application
	var movies = document.getElementById("movies");
	
	return {
		// the init function calls loadSearchResults
		init: function(title) {
			
			this.loadSearchResults(title);
			
		},
		
		// loadSearchResults is responsible for creating the XMLHttpRequest used in searching the OMDB database
		loadSearchResults: function(title) {
			// declare a variable called results
			var results;
			// create a new XMLHttpRequest
			var xhtp = new XMLHttpRequest();
			// onreadystatechange call a function
			xhtp.onreadystatechange = function() {
				// if the status codes check out
				if (xhtp.readyState == 4 && xhtp.status == 200) {
					// convert the response object to a javascript object
					results = JSON.parse(xhtp.responseText);
					// call appendMovieHtml to display the results
					app.appendMovieHtml(results);
				}
			};
			// make the actual ajax request
			xhtp.open("GET", "http://www.omdbapi.com/?s=" + title + "&r=json", true);
			// send the request
			xhtp.send();
			
		},
		
		// appendMovieHtml is responsible for actually appending the HTML to the page
		appendMovieHtml: function(results) {
			// set movies innerHTML to blank (clean slate)
			movies.innerHTML = "";
			// if we get a response
			if (results.Response === "True") {
				// for each object in the search, call createHTMLItem
				results.Search.forEach(function(obj) {
					app.createHTMLItem(obj);
				});
			} else {
				// otherwise, append no results to the page
				this.appendNoResults();
			}
		},
		
		// createHTMLItem is responsible for actually creating the HTML items that are appended to the page
		createHTMLItem: function(obj) {
			// create an LI element
			var li = document.createElement("LI");
			// create a DIV element
			var div = document.createElement("DIV");
			// create an IMG element
			var img = document.createElement("IMG");
			// create an I element
			var i = document.createElement("I");
			// create a span element
			var mtitle = document.createElement("SPAN");
			// create another span element 
			var myear = document.createElement("SPAN");
			// append the appropriate class name to the div
			div.className = "poster-wrap";
			// append the appropriate class name to the movie poster
			img.className = "movie-poster";
			// if there is a poster, append that URL to the src attribute of the img element
			if (obj.Poster !== "N/A") {
				img.src = obj.Poster;
				// append the child to the div
				div.appendChild(img);
			} else {
				// otherwise, append the correct classes to the i element
				i.className = "material-icons poster-placeholder";
				// set the proper innerHTML
				i.innerHTML = "crop_original";
				// append the child to the div
				div.appendChild(i);
			}
			// set the mtitle class name appropriately
			mtitle.className = "movie-title";
			// set the innerHTML
			mtitle.innerHTML = obj.Title;
			// set the myear class name appropriately
			myear.className = "movie-year";
			// set the innerHTML of the myear
			myear.innerHTML = obj.Year;
			// append the div element to the LI
			li.appendChild(div);
			// append the mtitle element to the li
			li.appendChild(mtitle);
			// append the myear element to the li
			li.appendChild(myear);
			// append the entire thing to movies 
			movies.appendChild(li);
		},
		
		// appendNoResults is responsible for displaying no results if nothing is returned
		appendNoResults: function() {
			// append the appropriate html to the movies element
			movies.innerHTML = "<li class='no-movies'>" +
							   "<i class='material-icons icon-help'>" +
							   "help_outline</i>" +
							   "No movies found that match";
		}
		
	};
  
}());

// set the event listener for the search
document.getElementById("submit").addEventListener("click", function(e) { e.preventDefault(); app.init(document.getElementById("search").value); });
