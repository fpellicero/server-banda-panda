var currentSearch;

(function () {
	/*
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

	var song7 = {
		title: "A Flight and a Crash",
		album: "A Flight and a Crash",
		artist: "Hot Water Music",
		audio: "/audio/7.mp3",
		cover: "/covers/2.jpg"
	};

	var song8 = {
		title: "Old Rules",
		album: "A Flight and a Crash",
		artist: "Hot Water Music",
		audio: "/audio/8.mp3",
		cover: "/covers/2.jpg"
	};

	var song9 = {
		title: "She Takes it so Well",
		album: "A Flight and a Crash",
		artist: "Hot Water Music",
		audio: "/audio/9.mp3",
		cover: "/covers/2.jpg"
	};
	*/
	var songs = [];

	function search(event) {
		event.preventDefault();
		query = $("#searchForm input").val();
		$.ajax({
        url: "/songs/search.json?q=" + query,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
          	songs = data;
            printSongs();
        },
        dataType: "json",
        });
	}

	function printSongs() {
		$("#songTab").addClass("active");
		$("#resultSongs").empty();

		// Funcio que pintarà les cançons
		function addSong(song) {
			var songElement = $("#songResult-Template").clone().attr("id","").appendTo("#resultSongs").removeClass("hidden");
			$("td.songTitle",songElement).text(song.song_title);
			$("td.albumTitle",songElement).text(song.album_title);
			$("td.artistName",songElement).text(song.artist_name);
			$("button.addButton",songElement).click(function() {
				addToCurrentPlaylist(song);
			});
			$("button.playButton",songElement).click(function() {
				playNow(song);
			})
			songElement.attr("audio_url",song.audio_url);
			songElement.attr("cover_url",song.cover_url);
		}
		console.log(songs);
		$(songs).each(function() {
			addSong(this);
		});
	}

	$(document).ready(function() {
		// Bind dels triggers
		console.log("Searchform")
		$("#searchForm").submit(search);
	})


})();