(function () {
	var songs = [];
	var tab = "songs";

	function search(event) {
		event.preventDefault();
		query = $("#searchForm input").val();
		var url;
		if(tab == "songs") {
			url = "/api/songs/search.json";
		}else if (tab == "albums") {
			url = "/api/albums/search.json";
		}else {
			url = "/api/artists/search.json";
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
		$("#searchSongsTable").addClass("hidden");
		$("#searchAlbumsTable").addClass("hidden");
		$("#searchArtistsTable").addClass("hidden");		
		$("#songTab").removeClass("active");
		$("#albumTab").removeClass("active");
		$("#artistTab").removeClass("active");
		$("#resultSongs").empty();
		$("#resultAlbums").empty();
		$("#resultArtists").empty();

		// Funcio que pintarà les cançons
		function addSong(song) {
			var songElement = $("#songResult-Template").clone().attr("id","").appendTo("#resultSongs").removeClass("hidden");
			$("td.songTitle",songElement).text(song.song_title);
			$("td.albumTitle",songElement).text(song.album_title);
			$("td.albumTitle",songElement).click(function() {
				mainLayout.showAlbum(song.album_id);
			});			
			$("td.artistName",songElement).text(song.artist_name);
			$("td.artistName",songElement).click(function() {
				mainLayout.showArtist(song.artist_id);
			});

			$("button.addButton",songElement).click(function() {
				audioPlayer.addSongToCurrent(song);
			});
			$("button.playButton",songElement).click(function() {
				audioPlayer.playSongNow(song);
			});

			$("button.recommendButton",songElement).click(function() {
				recomendations.showUser("song", song.song_id);
			})

			var dropdownUL = $("ul.dropdown-menu",songElement).attr("id","dropdown" + song.song_id);
			
			for (var i = 0; i < playlistsInterface.playlists.length; i++) {

				var playlist = playlistsInterface.playlists[i];
				var playlistElement = $("#playlistMenuItem").clone().attr("id","").appendTo(dropdownUL).removeClass("hidden");
				$("a",playlistElement).text(playlistsInterface.playlists[i].playlist_name);

				function x(song_id, playlist_id) {
					$(playlistElement).click(function() {
						console.log(song_id + "--" + playlist_id);
						playlistsInterface.addSongToPlaylist(song_id,playlist_id);
					});
				}
				x(song.song_id, playlist.playlist_id);

			}
		}

		function addAlbum(album) {
			var albumElement = $("#albumResult-Template").clone().attr("id","").appendTo("#resultAlbums").removeClass("hidden");
			$("td.albumCover img",albumElement).attr("src",album.cover_url);
			$("td.albumCover",albumElement).click(function() {
				mainLayout.showAlbum(album.album_id);
			})
			$("td.albumTitle", albumElement).text(album.album_title);
			$("td.albumTitle",albumElement).click(function() {
				mainLayout.showAlbum(album.album_id);
			})
			$("td.artistName", albumElement).text(album.artist_name);
			$("td.artistName",albumElement).click(function() {
				mainLayout.showArtist(album.artist_id);
			});

			$("button.recommendButton",albumElement).click(function() {
				recomendations.showUser("album", album.album_id);
			})
		}

		function addArtist(artist) {
			var artistElement = $("#artistResult-Template").clone().attr("id","").appendTo("#resultArtists").removeClass("hidden");
			$("td.artistImg img",artistElement).attr("src",artist.artist_img_url);
			$("td.artistName",artistElement).text(artist.artist_name);
			$("td", artistElement).click(function() {
				mainLayout.showArtist(artist.artist_id);
			})
			$("button.recommendButton",artistElement).click(function() {
				recomendations.showUser("artist", artist.artist_id);
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
		}else {
			$("#searchArtistsTable").removeClass("hidden");
			$(data).each(function() {
				addArtist(this);
			});
			$("#artistTab").addClass("active");
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
		});
		$("#artistTab").click(function(event) {
			tab = "artists";
			search(event);
		})
	})


})();