(function () {
	var songs = [];
	var tab = "songs";

	function search(event) {
		event.preventDefault();
		query = $("#searchForm input").val();
		var url;
		if(tab == "songs") {
			url = "/songs/search.json";
		}else if (tab == "albums") {
			url = "/albums/search.json";
		}else {
			url = "/artists/search.json";
		}

		$.ajax({
        url: url,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: { "q": query },
        success: function(data,textStatus,jqXHR){
            printResult(data);
        },
        dataType: "json",
        });
	}

	function printResult(data) {
		console.log(data);
		$("#searchSongsTable").addClass("hidden");
		$("#searchAlbumsTable").addClass("hidden");
		$("#songTab").removeClass("active");
		$("#albumTab").removeClass("active");
		$("#resultSongs").empty();
		$("#resultAlbums").empty();

		// Funcio que pintarà les cançons
		function addSong(song) {
			var songElement = $("#songResult-Template").clone().attr("id","").appendTo("#resultSongs").removeClass("hidden");
			$("td.songTitle",songElement).text(song.song_title);
			$("td.albumTitle",songElement).text(song.album_title);
			$("td.albumTitle",songElement).click(function() {
				mainLayout.showAlbum();
			});			
			$("td.artistName",songElement).text(song.artist_name);
			$("td.artistName",songElement).click(function() {
				mainLayout.showArtist();
			});

			$("button.addButton",songElement).click(function() {
				audioPlayer.addSongToCurrent(song);
			});
			$("button.playButton",songElement).click(function() {
				audioPlayer.playSongNow(song);
			})
		}

		function addAlbum(album) {
			var albumElement = $("#albumResult-Template").clone().attr("id","").appendTo("#resultAlbums").removeClass("hidden");
			$("td.albumCover img",albumElement).attr("src",album.cover_url);
			$("td.albumCover",albumElement).click(function() {
				mainLayout.showAlbum();
			})
			$("td.albumTitle", albumElement).text(album.album_title);
			$("td.albumTitle",albumElement).click(function() {
				mainLayout.showAlbum();
			})
			$("td.artistName", albumElement).text(album.artist_name);
			$("td.artistName",albumElement).click(function() {
				mainLayout.showArtist();
			})
		}
		
		if(tab == "songs") {
			$("#searchSongsTable").removeClass("hidden");
			$(data).each(function() {
				addSong(this);
			});	
			$("#songTab").addClass("active");
		}else if (tab == "albums") {
			$("#searchAlbumsTable").removeClass("hidden");
			$(data).each(function() {
				addAlbum(this);
			});	
			$("#albumTab").addClass("active");
		}

		
	}

	$(document).ready(function() {
		// Bind dels triggers
		$("#searchForm").submit(search);
		$("#songTab").click(function(event) {
			tab = "songs";
			search(event);
		});
		$("#albumTab").click(function(event) {
			tab = "albums";
			search(event);
		})
	})


})();