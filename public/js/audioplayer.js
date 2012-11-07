var currentPlaylist = [];

function playMusic() {
	currentSong = currentPlaylist.shift();
	$("#currentCover").attr("src", currentSong.cover);
	player = document.getElementById("audioPlayer");
	player.setAttribute("src",currentSong.audio);

	$("#currentTitle").html(currentSong.title);
	$("#currentAlbum").html(currentSong.album);
	$("#currentArtist").html(currentSong.artist);
	player.play();
};

$(document).ready(function() {
	document.getElementById("audioPlayer").addEventListener("ended", playMusic);
});