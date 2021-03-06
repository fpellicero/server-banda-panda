var artists = new Object();

(function() {
	
	artists.show = function (artist_id) {
		

		function printArtist(artist) {
			
			
			function addAlbum(album) {
				var albumElement = $("#artistAlbum-Template").clone().attr("id","").appendTo("#artistAlbums").removeClass("hidden");
				$("td.albumCover img",albumElement).attr("src",album.album_cover);
				$("td.albumCover",albumElement).click(function() {
					mainLayout.showAlbum(album.album_id);
				})
				$("td.albumTitle", albumElement).text(album.album_title);
				$("td.albumTitle",albumElement).click(function() {
					mainLayout.showAlbum(album.album_id);
				})
				$("td.buttons button.addButton",albumElement).click(function() {
					$.ajax({
						url: "/api/albums/" + album.album_id,
						headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
						success: function(data) {
							var songsAlbum = [];
							$(data.album_songs).each(function() {
								this.cover_url = album.album_cover;
								this.album_title = album.album_title;
								this.artist_name = artist.artist_name
								songsAlbum.push(this);
							});
							audioPlayer.addPlaylistToCurrent(songsAlbum);
						},
						dataType: "json"
					});
				});
				$("td.buttons button.playButton",albumElement).click(function() {
					$.ajax({
						url: "/api/albums/" + album.album_id,
						headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
						success: function(data) {
							var songsAlbum = [];
							$(data.album_songs).each(function() {
								this.cover_url = album.album_cover;
								this.album_title = album.album_title;
								this.artist_name = artist.artist_name
								songsAlbum.push(this);
							});
							audioPlayer.playPlaylistNow(songsAlbum);
						},
						dataType: "json"
					});
				});
			}
		
			$("#artistPortrait").attr("src",artist.artist_image);
			$("span.artist_name").text(artist.artist_name);
			$("span.artist_year").text(artist.artist_year);
			$("span.artist_info").text(artist.artist_info);
		
			$("#artistAlbums").empty();
			$(artist.artist_albums).each(function() {
				addAlbum(this);
			});
		}

		$.ajax({
        url: "/api/artists/" + artist_id,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
            printArtist(data);
        },
        dataType: "json",
        });
	}
})();