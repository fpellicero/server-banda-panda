var playlistsInterface = new Object();

playlistsInterface.getPlaylists = function (nCall) {
	if (nCall == 0) playlistsInterface.playlists = [];
	$.ajax({
        url: "/api/users/" + loggedUser.id + "/playlists.json?offset=" + nCall*10,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
        	console.log(data);
        	playlistsInterface.playlists = playlistsInterface.playlists.concat(data);
        	if (jqXHR.status == 206) {
        		playlistsInterface.getPlaylists(nCall + 1);
        	}
        	renderPlaylists();	
        },
        dataType: "json",
        });

	function renderPlaylists() {
		function addPlaylist(playlist) {
			var playlistElement = $("#playlist-Template").clone().attr("id","").appendTo("#navbarPlaylists").removeClass("hidden");
			
			$("a",playlistElement).text(playlist.playlist_name);
			
			playlistElement.click(function() {
				mainLayout.showPlaylist(playlist.playlist_id);
			});
		}
		$("#navbarPlaylists").empty();

		$(playlistsInterface.playlists).each(function() {
			addPlaylist(this);
		})
	};	
}

playlistsInterface.renderPlaylist = function (playlist_id) {
	// Funcio que pintarà les cançons
	$.ajax({
        url: "/api/playlists/" + playlist_id,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
        	paintResults(data);	
        },
        dataType: "json",
    });

    function paintResults(playlist) {
    	function addSong(song) {
			var songElement = $("#songPlaylist-Template").clone().attr("id","").appendTo("#playlistSongs").removeClass("hidden");
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

		$("#playlistSongs").empty();
		$("#playlistsWindow h2").text(playlist.playlist_name);
		$(playlist.songs).each(function() {
			addSong(this);
		});
		playlistsInterface.selectedPlaylist = playlist;

    }

	
}

playlistsInterface.createPlaylist = function (playlist) {
	$.ajax({
        url: "/api/users/" + loggedUser.id + "/playlists.json",
        type: "POST",
        contentType: "application/json",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: JSON.stringify(playlist),
        success: playlistsInterface.getPlaylists(),
    });

	playlistsInterface.getPlaylists(0);
	event.preventDefault();
}

playlistsInterface.addSongToPlaylist = function (song_id, playlist_id) {
	$.ajax({
        url: "/api/playlists/" + playlist_id + ".json",
        type: "POST",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: { "song_id": song_id },
        success: playlistsInterface.getPlaylists(),
    });
	
}

$(document).ready(function() {
	$("#playPlaylistButton").click(function() {
		audioPlayer.playPlaylistNow(playlistsInterface.selectedPlaylist.songs);
	});
	$("#addPlaylistToCurrentButton").click(function() {
		audioPlayer.addPlaylistToCurrent(playlistsInterface.selectedPlaylist.songs);
	});
	
	$("#createPlaylistForm").submit(function() {
		var playlist = {
			name: $("#createPlaylistForm input").val(),
			songs: []
		}
		playlistsInterface.createPlaylist(playlist);
	})
}) 