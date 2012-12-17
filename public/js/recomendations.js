var recomendations = new Object();

(function () {
	var recomendationType;
	var	recomendationResource;

	recomendations.showUser = function(type, resource_id) {
		recomendationType = type;
		recomendationResource = resource_id;
		$("#usersModal").modal();
	}

	function recommend(type, resource_id, user_id) {
		$.ajax({
			url: "/api/users/" + user_id + "/recommendations",
			type: "POST",
	        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
	        data: {
	        	"type": type,
	        	"resource_id": resource_id
	        }
		});

		$("#usersModal").modal('hide');
	}

	function showResults(data) {

		function addUser(user) {
			
			var userElement = $("#searchUserTemplate").clone().attr("id","").appendTo("#userSearchTable").removeClass("hidden");
			$("td",userElement).text(user.user_username);
			$(userElement).click(function() {
				recommend(recomendationType, recomendationResource, user.user_id);
			});
		}
		$("#userSearchTable").empty();
		$(data).each(function() {
			addUser(this);
		});
	}

	$(document).ready(function() {
		$("#searchUsersForm").submit(function() {
			event.preventDefault();
			var query = $("#searchUsersForm input").val();			
			$.ajax({
				url: "/api/users/search",
		        headers: { "X-AUTH-TOKEN": loggedUser.auth_token},
		        data: {"q": query},
		        success: function (data) {
		        	showResults(data);
		        },
		        dataType: "json"
			});

		})
	})
})();