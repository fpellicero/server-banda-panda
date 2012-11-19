
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

	mainLayout.showAlbum = function(album) {
		//event.preventDefault();
		hideAllWindows();
		$("#showAlbumWindow").removeClass("hidden");
	}

	/* Funcions auxiliars */
	function hideAllWindows() {
		$("#searchMusicWindow").addClass("hidden");
		$("#editProfileWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden");
		$("#showAlbumWindow").addClass("hidden");

		$("#searchMusicNavLink").removeClass("active");
		$("#editProfileNavLink").removeClass("active");
	}

	$(document).ready(function() {
		$("#searchMusicNavLink").click(mainLayout.showMusicSearch);
		$("#editProfileNavLink").click(mainLayout.showEditProfile);

	})
})();