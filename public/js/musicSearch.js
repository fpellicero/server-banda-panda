var currentSearch;

(function () {

	var song1 = {
		title: "Handwritten",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "url_handwritten",
		cover: "url_cover_handwritten"
	};

	var song2 = {
		title: "Satellite",
		album: "Endgame",
		artist: "Rise Against",
		audio: "url_satellite",
		cover: "url_cover_satellite"
	};

	var songs = [song1,song2];

	function printSongs(event) {
		event.preventDefault();
		$("#songTab").addClass("active");
		$("#resultSongs").empty();
		// Busquem les cançons
		// $.ajax()

		// Funcio que pintarà les cançons
		function addSong(song) {
			var songElement = $("#songResult-Template").clone().attr("id","").appendTo("#resultSongs").removeClass("hidden");
			$("td.songTitle",songElement).text(song.title);
			$("td.albumTitle",songElement).text(song.album);
			$("td.artistName",songElement).text(song.artist);
			songElement.attr("audio_url",song.audio);
			songElement.attr("cover_url",song.cover);
			console.log("Add Song");
		}
		console.log(songs);
		$(songs).each(function() {
			addSong(this);
		});
	}

	$(document).ready(function() {
		// Bind dels triggers
		console.log("Searchform")
		$("#searchForm").submit(printSongs);
	})


})();