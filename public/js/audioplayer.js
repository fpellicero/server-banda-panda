var currentPlaylist = [];
var songNum = 0;

function renderPlaylist() {
	$("#currentPlaylist").empty();
	var i = 0;
	$(currentPlaylist).each(function() {
		id = i++;
		thumbnail = $("<img id='thumbnail" + id + "' num=" + id + " rel='tooltip' title='" + this.song_title +"' data-placement=top class='img-rounded coverThumbnail' src='http://bandapanda.comlu.com/" + this.cover_url + "'>");
		thumbnail.tooltip();
		thumbnail.appendTo("#currentPlaylist");
		thumbnail.click(function() {
			songNum = $(this).attr("num");
			console.log(songNum);
			playMusic();
		});
		
	});
	var id = songNum-1;
	$("#thumbnail" + id).addClass("currentSongThumbnail");

	// Fem scroll per a que es vegi la thumb actual
	//if (id > 2) {
		var thumbWidth = $(".coverThumbnail").width() + 5;
		$("#currentPlaylistWrapper").animate({scrollLeft: (-thumbWidth*3 + (id * thumbWidth))});	
	//}
	
}

function playMusic() {
	
	if(0 < currentPlaylist.length && songNum < currentPlaylist.length) {
		currentSong = currentPlaylist[songNum++];
		$("#currentCover").attr("src", "http://bandapanda.comlu.com/" + currentSong.cover_url);
		player = document.getElementById("audioPlayer");
		player.setAttribute("src","http://bandapanda.comlu.com/" +  currentSong.audio_url);

		$("#currentTitle").html(currentSong.song_title);
		$("#currentAlbum").html(currentSong.album_title);
		$("#currentArtist").html(currentSong.artist_name);
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
	  maxScroll = (-240 + (70 * currentPlaylist.length));
	  futureScroll = this.scrollLeft - (delta * 30);
	  if (futureScroll >= maxScroll) {
	  	this.scrollLeft = maxScroll;
	  }else {
	  	this.scrollLeft = futureScroll;	
	  }
      event.preventDefault();
   });
});