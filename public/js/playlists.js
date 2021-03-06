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
        	paintResults(playlist_id, data);	
        },
        error: function() {
        	alert("404 Error: Playlist doesn't exist");
        },
        dataType: "json",
    });

    function paintResults(playlist_id, playlist) {
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
			$("button.deleteButton",songElement).click(function() {
				deleteSongFromPlaylist(playlist_id, song.song_id);
				$(songElement).remove();
			})
		}

		$("#playlistSongs").empty();
		$("#playlistsWindow h2").text(playlist.playlist_name);
		$(playlist.songs).each(function() {
			addSong(this);
		});

		playlistsInterface.selectedPlaylist = playlist;
		$("#deletePlaylistButton").unbind("click");
		$("#deletePlaylistButton").click(function() {
			$.ajax({
				url: "/api/playlists/" + playlist_id,
				type: "DELETE",
				headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
				success: function() {
					playlistsInterface.getPlaylists(0);
				}
			});
			mainLayout.showMusicSearch(event);
		});
		$("#recommendPlaylistButton").unbind("click");
		$("#recommendPlaylistButton").click(function() {
			recomendations.showUser("playlist", playlist_id);
		})
    }

	
}

playlistsInterface.createPlaylist = function (playlist) {
	$.ajax({
        url: "/api/users/" + loggedUser.id + "/playlists.json",
        type: "POST",
        contentType: "application/json",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: JSON.stringify(playlist),
        success: function() {
        	playlistsInterface.getPlaylists(0);
        }
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

function deleteSongFromPlaylist(playlist_id, song_id) {
	$.ajax({
		url:"/api/playlists/" + playlist_id + "/" + song_id,
		type:"DELETE",
		headers: { "X-AUTH-TOKEN": loggedUser.auth_token}
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