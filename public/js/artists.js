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
			}
		
			$("#artistPortrait").attr("src",artist.artist_image);
			$("span.artist_name").text(artist.artist_name);
		
			$("#artistAlbums").empty();
			$(artist.artist_albums).each(function() {
				addAlbum(this);
			});
		}

		$.ajax({
        url: "/artists/" + artist_id,
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
            printArtist(data);
        },
        dataType: "json",
        });
	}
})();