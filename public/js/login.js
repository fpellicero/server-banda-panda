
// Variable global on guardarem l'usuari autenticat
var loggedUser;

// Funcio anònima per a no embrutar l'espai de noms
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
		
		// Callback en cas d'èxit
		.success(function(data) { 
			loggedUser = {
				id: data.user_id,
				auth_token: data.auth_token
			};
			$(".login").fadeToggle(function() {
				$('#layout').fadeToggle();
				$('#layout').removeClass("hidden");
				mainLayout.loadContent();
			});
		})

		// Callback en cas d'error
		.error(function() {
			$("#login .alert-error").toggle(false);			
			$("#login .alert-error").toggle("slow");
		});
		
	};

	// Un cop tenim el DOM carregat, fem el bind.
	$(document).ready(function() {
		$("#login").submit(log_in);
	});

})(); // Executem la funció