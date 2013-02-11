Què és Banda Panda?
==================

Banda Panda és una plataforma de reproducció de música, similar a Grooveshark (http://grooveshark.com/), desenvolupada com a projecte per a l'assignatura "Projecte de Xarxes de Computadors" (PXC) de la Facultat d'Informàtica de Barcelona.

El sistema distribuït consta de 3 elements:
- Servidor
- Client Web
- Aplicació Android (https://github.com/andycyd/bandapanda)

Per a una visió detallada de què és el sistema, quin problema aborda i com el soluciona, es pot veure la memòria de projecte: http://dl.dropbox.com/u/22416047/BandaPanda/Memoria.pdf

Una versió funcional es troba desplegada a: http://polar-thicket-1771.herokuapp.com/
Per a accedir es pot utilitzar el mail "test@example.com" i pass "testing"

Servidor
===========

El back-end de l'aplicació s'ha implementat en Ruby, utilitzant el framework Ruby on Rails.

Es basa d'un sistema d'informació bàsic que ens permet organitzar i emmagatzemar cançons, artistes, albums, llistes de reproducció i usuaris.

A la memòria de projecte es poden consultar diagrames i especificacions d'aquest sistema.

Aquest S.I s'exposa a la xarxa en forma de API RESTful que permet obtenir una representació en format JSON dels recursos. Es pot consultar l'especificació de la API al següent enllaç: http://dl.dropbox.com/u/22416047/BandaPanda/Annex%203.pdf

Client Web
===========

El front-end s'ha implementat utilitzant les principals tecnologies dels navegadors moderns:
- Javascript + jQuery: S'ha utilitzat per a programar tota la lògica del portal. Gràcies a la tecnologia AJAX s'ha aconseguit una interacció amb l'usuari molt fluïda que permet mantenir en tot moment el reproductor d'audio. No s'ha utilitzat cap tipus de framework

- HTML5: Per a la reproducció d'audio s'ha optat per utilitzar el reproductor natiu proporcionat per HTML (tag <audio>). Gràcies a això, no és necessari cap tipus de plugin o software addicional per a utilitzar la pagina. Degut a la política de cada navegador, no tots els navegadors principals poden reproduir la música de Banda Panda, degut a que hem utilitzat formats .mp3 (Mozilla Firefox NO és compatible)

- CSS: S'ha utiltizat el popular framework Twitter Bootstrap (https://github.com/twitter/bootstrap).
