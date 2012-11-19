
/* DUMMY CODE */
var song1 = {
	song_title: "American Slang",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/1.mp3",
	cover_url: "/covers/1.jpg"
};

var song2 = {
	song_title: "Stay Lucky",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/2.mp3",
	cover_url: "/covers/1.jpg"
};

var song3 = {
	song_title: "Bring it On",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/3.mp3",
	cover_url: "/covers/1.jpg"
};

var song4 = {
	song_title: "The Diamond Church Street Choir",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/4.mp3",
	cover_url: "/covers/1.jpg"
};

var song5 = {
	song_title: "The Queen of Lower Chelsea",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/5.mp3",
	cover_url: "/covers/1.jpg"
};

var song6 = {
	song_title: "Orphans",
	album_title: "Handwritten",
	artist_name: "The Gaslight Anthem",
	audio_url: "/audio/6.mp3",
	cover_url: "/covers/1.jpg"
};

var song7 = {
	song_title: "A Flight and a Crash",
	album_title: "A Flight and a Crash",
	artist_name: "Hot Water Music",
	audio_url: "/audio/7.mp3",
	cover_url: "/covers/2.jpg"
};

var song8 = {
	song_title: "Old Rules",
	album_title: "A Flight and a Crash",
	artist_name: "Hot Water Music",
	audio_url: "/audio/8.mp3",
	cover_url: "/covers/2.jpg"
};

var song9 = {
	song_title: "She Takes it so Well",
	album_title: "A Flight and a Crash",
	artist_name: "Hot Water Music",
	audio_url: "/audio/9.mp3",
	cover_url: "/covers/2.jpg"
};
var playlist1 = {
	name: "test 1",
	songs: [song1,song2,song3,song4,song5,song6,song7,song8,song9]
};
var playlist2 = {
	name: "test 2",
	songs: [song1,song2,song3,song4,song5,song6,song7,song8,song9]
};
var playlist3 = {
	name: "test 3",
	songs: [song1,song2,song3,song4,song5,song6,song7,song8,song9]
};
/* DUMMY CODE */

var playlistsInterface = new Object();
playlistsInterface.playlists = [playlist1,playlist2,playlist3];

playlistsInterface.getPlaylists = function () {
	/* 
	$.ajax({
        url: "/users/" + loggedUser.id + /playlists.json",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        success: function(data,textStatus,jqXHR){
          	playlists = data;
            printSongs();
        },
        dataType: "json",
        });
	*/
	var playlists = playlistsInterface.playlists;

	function addPlaylist(playlist) {
		var playlistElement = $("#playlist-Template").clone().attr("id","").appendTo("#navbarPlaylists").removeClass("hidden");
		
		$("a",playlistElement).text(playlist.name);
		
		playlistElement.click(function() {
			playlistsInterface.selectedPlaylist = playlist;
			mainLayout.showPlaylist();
		});
	}
	$("#navbarPlaylists").empty();
	$(playlists).each(function() {
		addPlaylist(this);
	})
}

playlistsInterface.renderSelectedPlaylist = function () {
	// Funcio que pintarà les cançons
	function addSong(song) {
		var songElement = $("#songPlaylist-Template").clone().attr("id","").appendTo("#playlistSongs").removeClass("hidden");
		$("td.songTitle",songElement).text(song.song_title);
		$("td.albumTitle",songElement).text(song.album_title);
		$("td.albumTitle",songElement).click(function() {
				mainLayout.showAlbum();
			});
		$("td.artistName",songElement).text(song.artist_name);
		$("td.artistName",songElement).click(function() {
				mainLayout.showArtist();
			});
		$("button.addButton",songElement).click(function() {
			audioPlayer.addSongToCurrent(song);
		});
		$("button.playButton",songElement).click(function() {
			audioPlayer.playSongNow(song);
		})	
	}

	$("#playlistSongs").empty();
	$("#playlistsWindow h2").text(playlistsInterface.selectedPlaylist.name);
	$(playlistsInterface.selectedPlaylist.songs).each(function() {
		addSong(this);
	});
}

playlistsInterface.createPlaylist = function (playlist) {
	/*
	$.ajax({
        url: "/users/" + loggedUser.id + /playlists.json",
        type: "POST",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: JSON.stringify(playlist),
        success: playlistsInterface.getPlaylists(),
    });
	*/
	event.preventDefault();
	alert("Not implemented yet!");
}

playlistsInterface.addSongToPlaylist = function (song, playlist_id) {
	/*
	var requestBody = {
		song: song,
		playlist_id: playlist_id
	};
	$.ajax({
        url: "/users/" + loggedUser.id + /playlists/" + playlist_id",
        type: "POST",
        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
        data: JSON.stringify(requestBody),
    });
	*/
}

$(document).ready(function() {
	$("#playPlaylistButton").click(function() {
		audioPlayer.playPlaylistNow(playlistsInterface.selectedPlaylist.songs);
	});
	$("#addPlaylistToCurrentButton").click(function() {
		audioPlayer.addPlaylistToCurrent(playlistsInterface.selectedPlaylist.songs);
	});
	$("#createPlaylistForm").submit(function() {
		playlistsInterface.createPlaylist([]);
	})
}) 