
var notifications = new Object();

(function() {
      var notifications_list = [];

      notifications.renderNotifications = function() {

            function addNotification(notification) {
                  var notificationElement = $("#notificationMenuTemplate").clone().attr("id","").appendTo(".notifications ul").removeClass("hidden");
                  $("a", notificationElement).text(notification);      
            }
            $(".notifications ul").empty();
            $(notifications_list).each(function() {
                  addNotification(this);
                  console.log(this);
            });
            
      }

      notifications.init = function() {
            var pusher = new Pusher('37cc28f59fd3d3e4f801');
            var channel = pusher.subscribe('notifications_' + loggedUser.id);
            // Enable pusher logging - don't include this in production
                Pusher.log = function(message) {
                  if (window.console && window.console.log) window.console.log(message);
                };
                console.log("HUSBISI");
            channel.bind('song_recommendation', function(data) {
                  var notification = $("#notification-template").clone().attr("id","").prependTo("#notifications").text(data.source_id);
                  $(notification).fadeIn().delay(3000).fadeOut();
                  notifications_list.push(data.soure);
                  notifications.renderNotifications();
            });      
      }
      
})();