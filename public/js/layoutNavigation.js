
	function showEditProfile(event) {
		event.preventDefault();
		$("#searchMusicWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden")
		$("#editProfileWindow").removeClass("hidden");

		$("#searchMusicNavLink").removeClass("active");
		$("#editProfileNavLink").addClass("active");

	}

	function showMusicSearch(event) {
		event.preventDefault();
		$("#editProfileWindow").addClass("hidden");
		$("#playlistsWindow").addClass("hidden")
		$("#searchMusicWindow").removeClass("hidden");

		$("#editProfileNavLink").removeClass("active");
		$("#searchMusicNavLink").addClass("active");

	}

	function showPlaylist() {
		event.preventDefault();
		$("#editProfileWindow").addClass("hidden");
		$("#searchMusicWindow").addClass("hidden");
		$("#playlistsWindow").removeClass("hidden");

		$("#editProfileNavLink").removeClass("active");
		$("#searchMusicNavLink").removeClass("active");
		renderPlaylist();
	}

	function loadContent() {
		getPlaylists();
	}

(function() {
	$(document).ready(function() {
		$("#searchMusicNavLink").click(showMusicSearch);
		$("#editProfileNavLink").click(showEditProfile);

	})
})();