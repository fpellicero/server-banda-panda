
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
	var selectedPlaylist;

function getPlaylists() {
	var playlists = [playlist1,playlist2,playlist3];

	function addPlaylist(playlist) {
		var playlistElement = $("#playlist-Template").clone().attr("id","").appendTo("#navbarPlaylists").removeClass("hidden");
		$("a",playlistElement).text(playlist.name);
		playlistElement.click(function() {
			selectedPlaylist = playlist;
			showPlaylist();
		});
	}
	$("#navbarPlaylists").empty();
	$(playlists).each(function() {
		addPlaylist(this);
	})
}

function renderPlaylist() {
	// Funcio que pintarà les cançons
	function addSong(song) {
		var songElement = $("#songPlaylist-Template").clone().attr("id","").appendTo("#playlistSongs").removeClass("hidden");
		$("td.songTitle",songElement).text(song.song_title);
		$("td.albumTitle",songElement).text(song.album_title);
		$("td.artistName",songElement).text(song.artist_name);
		$("button.addButton",songElement).click(function() {
			addToCurrentPlaylist(song);
		});
		$("button.playButton",songElement).click(function() {
			playNow(song);
		})	
	}

	$("#playlistSongs").empty();
	$("#playlistsWindow h2").text(selectedPlaylist.name);
	$(selectedPlaylist.songs).each(function() {
		addSong(this);
	});
}

$(document).ready(function() {

	$("#playPlaylistButton").click(function() {
		playPlaylist(playlist.songs);
	});
	$("#addPlaylistToCurrentButton").click(function() {
		addPlaylistToCurrent(playlist.songs);
	});
}) 