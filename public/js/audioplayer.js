var currentPlaylist = [];
var songNum = 0;

function renderPlaylist() {
	$("#currentPlaylist").empty();
	var i = 0;
	$(currentPlaylist).each(function() {
		thumbnail = $("<img id='thumbnail" + i++ + "' rel='tooltip' title='" + this.title +"' data-placement=top class='img-rounded coverThumbnail' src='" + this.cover + "'>");
		thumbnail.tooltip();
		thumbnail.appendTo("#currentPlaylist");
		
	});
	var id = songNum-1;
	$("#thumbnail" + id).addClass("currentSongThumbnail");

	// Fem scroll per a que es vegi la thumb actual
	//if (id > 2) {
		$("#currentPlaylistWrapper").animate({scrollLeft: (-140 + (id * 70))});	
	//}
	
}

function playMusic() {
	
	if(0 < currentPlaylist.length && songNum < currentPlaylist.length) {
		currentSong = currentPlaylist[songNum++];
		$("#currentCover").attr("src", currentSong.cover);
		player = document.getElementById("audioPlayer");
		player.setAttribute("src",currentSong.audio);

		$("#currentTitle").html(currentSong.title);
		$("#currentAlbum").html(currentSong.album);
		$("#currentArtist").html(currentSong.artist);
		$("#playButton").html("<i class=icon-pause></i>");
		renderPlaylist();
		player.play();	
	}else {
		$("#currentCover").attr("src", "/covers/noCover.png");
		currentSong = 0;
		player = document.getElementById("audioPlayer");
		player.setAttribute("src","");
		$("#currentTitle").html("");
		$("#currentAlbum").html("");
		$("#currentArtist").html("");
		$("#playButton").html("<i class=icon-play></i>");
		renderPlaylist();
	}
	
};

function addToCurrentPlaylist(song) {
	currentPlaylist.push(song);
	renderPlaylist();
}

function playNow(song) {
	currentPlaylist.splice(songNum, 0, song);
	playMusic();
}

$(document).ready(function() {
	document.getElementById("audioPlayer").addEventListener("ended", playMusic);
	$("#nextButton").click(playMusic);
	$("#playButton").click(function() {
		player = document.getElementById("audioPlayer");
		
		if (player.src == "") {
			playMusic();
		}else {
			if (player.paused) {
				player.play()
				$("#playButton").html("<i class=icon-pause></i>");
			}else {
				player.pause();
				$("#playButton").html("<i class=icon-play></i>");
			}	
		}
		
	});

	$("#prevButton").click(function() {
		songNum = songNum - 2;
		console.log(songNum);
		playMusic();
	});
	$("#currentPlaylistWrapper").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
   });
});