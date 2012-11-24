
var mainLayout = new Object();

(function() {

	/* Definim funcions publiques */
	mainLayout.showEditProfile = function (event) {
		event.preventDefault();

		hideAllWindows();
		$("#editProfileWindow").removeClass("hidden");
		$("#editProfileNavLink").addClass("active");

	};

	mainLayout.showMusicSearch = function (event) {
		event.preventDefault();

		hideAllWindows();
		$("#searchMusicWindow").removeClass("hidden");
		$("#searchMusicNavLink").addClass("active");

	};

	mainLayout.showPlaylist = function () {
		event.preventDefault();

		hideAllWindows();
		$("#playlistsWindow").removeClass("hidden");

		playlistsInterface.renderSelectedPlaylist();
	};

	mainLayout.loadContent = function () {
		playlistsInterface.getPlaylists();
	};

	mainLayout.showAlbum = function(album_id) {
		//event.preventDefault();
		hideAllWindows();
		$("#showAlbumWindow").removeClass("hidden");
		albums.show(album_id)
	}

	mainLayout.showArtist = function(artist_id) {
		hideAllWindows();
		$("#showArtistWindow").removeClass("hidden");
		artists.show(artist_id)
	}

	/* Funcions auxiliars */
	function hideAllWindows() {
		$("#searchMusicWindow").addClass("hidden");
		$("#editProfileWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden");
		$("#showAlbumWindow").addClass("hidden");
		$("#showArtistWindow").addClass("hidden");

		$("#searchMusicNavLink").removeClass("active");
		$("#editProfileNavLink").removeClass("active");
	}

	$(document).ready(function() {
		$("#searchMusicNavLink").click(mainLayout.showMusicSearch);
		$("#editProfileNavLink").click(mainLayout.showEditProfile);

	})
})();