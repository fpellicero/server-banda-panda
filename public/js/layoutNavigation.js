(function() {
	function showEditProfile(event) {
		//event.preventDefault();
		$("#searchMusicWindow").addClass("hidden");
		$("#editProfileWindow").removeClass("hidden");

		$("#searchMusicNavLink").removeClass("active");
		$("#editProfileNavLink").addClass("active");

	}

	function showMusicSearch(event) {
		//event.preventDefault();
		$("#editProfileWindow").addClass("hidden");
		$("#searchMusicWindow").removeClass("hidden");

		$("#editProfileNavLink").removeClass("active");
		$("#searchMusicNavLink").addClass("active");

	}

	$(document).ready(function() {
		$("#searchMusicNavLink").click(showMusicSearch);
		$("#editProfileNavLink").click(showEditProfile);
	})
})();