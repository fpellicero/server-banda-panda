
// Variable global on guardarem l'usuari autenticat
var loggedUser;

(function() {


	function log_in (event) {
		// Aturem l'acció per defecte del form
		event.preventDefault();

		// Obtenim les dades del formulari
		var email = $(this).find( 'input[name="email"]').val();
		var pass = $(this).find( 'input[name="pass"]').val();
		var url = $(this).attr('action');

		// Fem la petició a la API
		$.post( url, { 'user[email]': email, 'user[password]': pass})
		.success(function(data) {
			loggedUser = {
				id: data.user_id,
				auth_token: data.auth_token
			};
			$(".login").fadeToggle(function() {
				$('#layout').removeClass("hidden");
			});
			console.log(loggedUser);
		})
		.error(function() {
			$("#login .alert-error").fadeToggle();
		});
	};

	$(document).ready(function() {
		$("#login").submit(log_in);
	});

})();