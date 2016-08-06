var app = (function() {
	
	return {
		
		init: function(title) {
			
			this.loadSearchResults(title);
			
		},
		
		loadSearchResults: function(title) {
			
			var results;
			var xhtp = new XMLHttpRequest();
			xhtp.onreadystatechange = function() {
				if (xhtp.readyState == 4 && xhtp.status == 200) {
					results = JSON.parse(xhtp.responseText);
					app.appendMovieHtml(results);
				}
			};
			xhtp.open("GET", "http://www.omdbapi.com/?s=" + title + "&r=json", true)
			xhtp.send();
			
		},
		
		appendMovieHtml: function(results) {
			if (results.Response === "True") {
				results.Search.forEach(function(obj) {
					app.createHTMLItem(obj);
				});
			} else {
				this.appendNoResults();
			}
		},
		
		createHTMLItem: function(obj) {
			var li = document.createElement("LI");
			var div = document.createElement("DIV");
			var img = document.createElement("IMG");
			var i = document.createElement("I");
			var mtitle = document.createElement("SPAN");
			var myear = document.createElement("SPAN");
			var movies = document.getElementById("movies");
			div.className = "poster-wrap";
			img.className = "movie-poster";
			if (obj.Poster !== "N/A") {
				img.src = obj.Poster;
				div.appendChild(img);
			} else {
				i.className = "material-icons poster-placeholder";
				i.innerHTML = "crop_original";
				div.appendChild(i);
			}
			mtitle.className = "movie-title";
			mtitle.innerHTML = obj.Title;
			myear.className = "movie-year";
			myear.innerHTML = obj.Year;
			li.appendChild(div);
			li.appendChild(mtitle);
			li.appendChild(myear);
			movies.appendChild(li);
		},
		
		appendNoResults: function() {
			var movies = document.getElementById("movies");
			movies.innerHTML = "<li class='no-movies'>" +
							   "<i class='material-icons icon-help'>" +
							   "help_outline</i>" +
							   "No movies found that match";
		}
		
	}
}());

app.init("ladskjf;lkajsdf;lj");