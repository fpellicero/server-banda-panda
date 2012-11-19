
	var mainLayout = new Object();

	mainLayout.showEditProfile = function (event) {
		event.preventDefault();
		$("#searchMusicWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden")
		$("#editProfileWindow").removeClass("hidden");

		$("#searchMusicNavLink").removeClass("active");
		$("#editProfileNavLink").addClass("active");

	};

	mainLayout.showMusicSearch = function (event) {
		event.preventDefault();
		$("#editProfileWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden")
		$("#searchMusicWindow").removeClass("hidden");

		$("#editProfileNavLink").removeClass("active");
		$("#searchMusicNavLink").addClass("active");

	};

	mainLayout.showPlaylist = function () {
		event.preventDefault();
		$("#editProfileWindow").addClass("hidden");
		$("#searchMusicWindow").addClass("hidden");
		$("#playlistsWindow").removeClass("hidden");

		$("#editProfileNavLink").removeClass("active");
		$("#searchMusicNavLink").removeClass("active");
		playlistsInterface.renderSelectedPlaylist();
	};

	mainLayout.loadContent = function () {
		playlistsInterface.getPlaylists();
	};

(function() {
	$(document).ready(function() {
		$("#searchMusicNavLink").click(mainLayout.showMusicSearch);
		$("#editProfileNavLink").click(mainLayout.showEditProfile);

	})
})();