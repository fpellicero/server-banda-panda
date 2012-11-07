var currentSearch;

(function () {

	var song1 = {
		title: "American Slang",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/1.mp3",
		cover: "/covers/1.jpg"
	};

	var song2 = {
		title: "Stay Lucky",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/2.mp3",
		cover: "/covers/1.jpg"
	};

	var song3 = {
		title: "Bring it On",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/3.mp3",
		cover: "/covers/1.jpg"
	};

	var song4 = {
		title: "The Diamond Church Street Choir",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/4.mp3",
		cover: "/covers/1.jpg"
	};

	var song5 = {
		title: "The Queen of Lower Chelsea",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/5.mp3",
		cover: "/covers/1.jpg"
	};

	var song6 = {
		title: "Orphans",
		album: "Handwritten",
		artist: "The Gaslight Anthem",
		audio: "/audio/6.mp3",
		cover: "/covers/1.jpg"
	};

	var songs = [song1,song2,song3,song4,song5,song6];

	function printSongs(event) {
		event.preventDefault();
		$("#songTab").addClass("active");
		$("#resultSongs").empty();
		// Busquem les cançons
		/*
		$.ajax({
        url: "/music/search",
        headers: "X-AUTH-TOKEN:" + loggedUser.auth_token
        success: function(data,textStatus,jqXHR){
          	songs = data
            printSongs();
        },
        dataType: "json",
        });
		*/

		// Funcio que pintarà les cançons
		function addSong(song) {
			var songElement = $("#songResult-Template").clone().attr("id","").appendTo("#resultSongs").removeClass("hidden");
			$("td.songTitle",songElement).text(song.title);
			$("td.albumTitle",songElement).text(song.album);
			$("td.artistName",songElement).text(song.artist);
			$("button.addButton",songElement).click(function() {
				currentPlaylist.push(song);
			});
			$("button.playButton",songElement).click(function() {
				currentPlaylist.unshift(song);
				playMusic();
			})
			songElement.attr("audio_url",song.audio);
			songElement.attr("cover_url",song.cover);
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