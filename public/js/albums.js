var albums = new Object();

(function() {
	albums.show = function (album_id) {
		
		function printAlbum(album) {	
			var songs = [];
			function addSong(song) {
				song.cover_url = album.cover_url;
				song.album_title = album.album_title;
				song.artist_name = album.artist_name;
				songs.push(song);

				var songElement = $("#songAlbum-Template").clone().attr("id","").appendTo("#albumSongs").removeClass("hidden");
				$("td.songTrack",songElement).text(song.song_track);
				$("td.songTitle",songElement).text(song.song_title);
				$("button.addButton",songElement).click(function() {
					audioPlayer.addSongToCurrent(song);
				});
				$("button.playButton",songElement).click(function() {
					audioPlayer.playSongNow(song);
				})
			}
		
			$("#showAlbumWindow img").attr("src",album.cover_url);
			$("span.title").text(album.album_title);
			$("span.artist").text(album.artist_name);
			$("button.buttonPlay").click(function() {
				audioPlayer.playPlaylistNow(songs);
			});
			$("button.buttonAdd").click(function() {
				audioPlayer.addPlaylistToCurrent(songs);
			})

			$("#albumSongs").empty();
			$(album.album_songs).each(function() {
				addSong(this);
			});
		}

		$.ajax({
        url: "/albums/" + album_id,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
            printAlbum(data);
        },
        dataType: "json",
        });
	}
})();