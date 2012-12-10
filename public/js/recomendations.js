var recomendations = new Object();

(function () {
	var recomendationType;
	var	recomendationResource;

	recomendations.showUser = function(type, resource_id) {
		recomendationType = type;
		recomendationResource = resource_id;
		$("#usersModal").modal();
	}
})();