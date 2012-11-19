(function () {
	var songs = [];

	function search(event) {
		event.preventDefault();
		query = $("#searchForm input").val();
		
		$.ajax({
        url: "/songs/search.json",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: { "q": query },
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
				audioPlayer.addSongToCurrent(song);
			});
			$("button.playButton",songElement).click(function() {
				audioPlayer.playSongNow(song);
			})
		}
		console.log(songs);
		$(songs).each(function() {
			addSong(this);
		});
	}

	$(document).ready(function() {
		// Bind dels triggers
		$("#searchForm").submit(search);
	})


})();