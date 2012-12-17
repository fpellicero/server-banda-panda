
var notifications = new Object();

(function() {
      var notifications_list = [];

      notifications.printNotification = function(text) {
        var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications");
        notification.text(text);
          
        $(notification).fadeIn().delay(3000).fadeOut();
      }

      notifications.renderNotifications = function() {

            function addNotification(notification) {
                  var notificationElement = $("#notificationMenuTemplate").clone().attr("id","").appendTo(".notifications ul").removeClass("hidden");
                  var text = notification.source_username + " recommended you the " + notification.type + ": " + notification.resource_name;
                  if(notification.read == 0) {
                    notificationElement.addClass("unread");
                  }
                  $("a", notificationElement).text(text);
                  if(notification.type == "song") {
                    notificationElement.click(function() {
                      $.ajax({
                        url: "/api/songs/" + notification.resource_id,
                        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
                        success: function(data) {
                          audioPlayer.playSongNow(data);
                        }
                      });  
                    });                    
                  }else if (notification.type == "album") {
                    notificationElement.click(function() {
                      if(notification.read == 0) {
                        notification.read = 1;
                        notifications.renderNotifications();
                      }
                      mainLayout.showAlbum(notification.resource_id);
                    });
                  }else if (notification.type == "artist") {
                    notificationElement.click(function() {
                      if(notification.read == 0) {
                        notification.read = 1;
                        notifications.renderNotifications();

                      }
                      mainLayout.showArtist(notification.resource_id);
                    });
                  }else if (notification.type == "playlist") {
                    notificationElement.click(function() {
                      if(notification.read == 0) {
                        notification.read = 1;
                        notifications.renderNotifications();

                      }
                      mainLayout.showPlaylist(notification.resource_id);
                    });
                  }
            }

            $(".notifications ul").empty();
            $(notifications_list).each(function() {
                  addNotification(this);
            });
            
      }

      notifications.init = function() {
            var pusher = new Pusher('37cc28f59fd3d3e4f801');
            var channel = pusher.subscribe('notifications_' + loggedUser.id);
            
            channel.bind('song_recommendation', function(data) {
                  var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications");
                  notification.text(data.source_username + " recommended you the song: " + data.resource_name);
          
                  $(notification).fadeIn().delay(3000).fadeOut();
                  
                  data.type = "song";
                  data.read = 0;
                  notifications_list.unshift(data);
                  notifications.renderNotifications();
            });

            channel.bind('album_recommendation', function(data) {
                  var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications");
                  notification.text(data.source_username + " recommended you the album: " + data.resource_name);
          
                  $(notification).fadeIn().delay(3000).fadeOut();
                  
                  data.type = "album";
                  data.read = 0;
                  notifications_list.unshift(data);
                  notifications.renderNotifications();
            });

            channel.bind('artist_recommendation', function(data) {
                  var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications");
                  notification.text(data.source_username + " recommended you the artist: " + data.resource_name);
          
                  $(notification).fadeIn().delay(3000).fadeOut();
                  
                  data.type = "artist";
                  data.read = 0;
                  notifications_list.unshift(data);
                  notifications.renderNotifications();
            });

            channel.bind('playlist_recommendation', function(data) {
                  var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications");
                  notification.text(data.source_username + " recommended you the playlist: " + data.resource_name);
                  
                  $(notification).fadeIn().delay(3000).fadeOut();
                  
                  data.type = "playlist";
                  data.read = 0;
                  notifications_list.unshift(data);
                  notifications.renderNotifications();
            });     
      }

      notifications.get = function() {
        $.ajax({
          url: "/api/users/" + loggedUser.id + "/recommendations",
          headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
          success: function(data) {
            notifications_list = data;
            notifications.renderNotifications();
          },
          dataType: "json"
        });
      }
      
})();