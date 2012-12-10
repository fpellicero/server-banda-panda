
// Variable global on guardarem l'usuari autenticat
var loggedUser;

// Funcio anònima per a no embrutar l'espai de noms
(function() {

	function check_remember() {
		var i,x,y,ARRcookies=document.cookie.split(";");
		var remembered = 0;
		var remembered_id;
		var remembered_token;
		for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x=="remember_user_id") {
		    remembered_id = y;
		    remembered = 1;
		  } else if (x == "remember_user_token") {
		    remembered_token = y;
		    remembered = 1;
		  }
		}
		if(remembered == 1) {
			loggedUser = {
				id: remembered_id,
				auth_token: remembered_token
			};
			$(".login").fadeToggle(function() {
				$('#layout').fadeToggle();
				$('#layout').removeClass("hidden");
				mainLayout.loadContent();
			});
		}
	}

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
			notifications.init();
			if($("#remember_me").attr("checked")) {
				document.cookie="remember_user_id" + "=" + data.user_id;
				document.cookie = "remember_user_token=" + data.auth_token;
			}
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
		check_remember();
	});

})(); // Executem la funció