var canvas = document.getElementById("canvas");
var boton = document.getElementById("boton");
var coordenadas = document.getElementById("coordenadas");
var puntaje = document.getElementById("puntaje");
var reiniciarbtn = document.getElementsByClassName("reiniciarbtn")

for (var i = 0; i <reiniciarbtn.length;i++){
	reiniciarbtn[i].addEventListener("click", function() {
		location.reload();
	})
}

boton.addEventListener("click",function(){
	var tamrango = document.getElementById("tamrango");
	var velrango = document.getElementById("velrango");
	var puntos = 0;
	var concatenar = ""
	var time = parseFloat(velrango.value)*100
	tamrango.disabled = true;
	velrango.disabled = true;
	boton.disabled = true
	var avance = true;
	var dirLD=0;
	var dirUD=1;
	var mitad = parseInt(parseInt(tamrango.value)/2)
	var initx = 0
	var inity = 0
	var combinedxy = mitad+","+mitad
	var snakepos = [combinedxy]

	function posfruta(){
		var intentostotales=0
		while(true) {
			if(intentostotales<tamrango.value*2){
				var parecido = 0
				p1x = Math.floor((Math.random()*(tamrango.value-1)))
				p1y = Math.floor((Math.random()*(tamrango.value-1)))
				var checpos = p1x+","+p1y;
				for (var h=0;h<snakepos.length;h++){
					if (checpos==snakepos[h]){
						parecido ++
					}
				}
				if (parecido==0){
					return checpos
				}
			}
			else{
				clearInterval(inf)
				finpopup(puntos,"ganar")
				break;
			}
			intentostotales++
		}
	}

	var frutaspos = posfruta()
	var inf = setInterval(function(){
		puntaje.innerHTML = "Puntaje: "+puntos;
		document.addEventListener("keypress",function(key){
			switch(key.key){
				case "a":
					if(dirLD==1){
					}
					else{
						dirLD=-1
						dirUD=0
						break;
					}
					
				case "d":
					if(dirLD==(1*-1)){
					}
					else{
						dirLD=1
						dirUD=0
						break;
					}
				case "w":
					if(dirUD==1){

					}else{
						dirUD=-1
						dirLD=0
						break;
					}
					
				case "s":
					if(dirUD==-1){

					}
					else{
						dirUD=1
						dirLD=0
						break;
					}
					
			}
		})
		
		snakepos[0] = (inity+=dirUD)+","+(initx+=dirLD)

		for(var e=1;e<snakepos.length;e++){
			if (snakepos[0]==snakepos[e]){
				clearInterval(inf)
				finpopup(puntos,"perder")
				break;
			}
		}

		for(var c=0;c<4;c++){
			var headposarray = snakepos[0].split(",")
			var y = parseInt(headposarray[0])
			var x = parseInt(headposarray[1])
			if(x>=parseInt(tamrango.value) || x<0){
				clearInterval(inf)
				finpopup(puntos,"perder")
				break;
			}
			else if(y>=parseInt(tamrango.value) || y<0){
				clearInterval(inf)
				finpopup(puntos,"perder")
				break;
			}
		}

		var filas = canvas.getElementsByTagName("div")
		loop1:
		for(var i=0;i<filas.length;i++){
			var celdas =  filas[i].getElementsByTagName("div")
			loop2:
			for(var j=0;j<celdas.length;j++){
				celdas[j].className = "cell"
				if (celdas[j].title==frutaspos){
						celdas[j].className = "frutilla"
				}
				for (var h=0;h<snakepos.length;h++){
					if (celdas[j].title==snakepos[0]){
						celdas[j].className = "snakehead"
					}
					else if (celdas[j].title==snakepos[h]){
						celdas[j].className = "snake"
					}

					if(snakepos[0]==frutaspos){
						puntos++
						frutaspos = posfruta()
						snakepos.push(snakepos[snakepos.length-1]);
						break loop1;
					}
				}
			}
		}

		coordenadas.innerHTML = ""
		concatenar = ""
		for(var a=0;a<snakepos.length;a++){
			concatenar += ("|"+a+": "+snakepos[a]+"| ")
			if(a>0){
				if(avance){
					avance=false
				}
				else{
					if (snakepos[(snakepos.length-1)-a]){
						snakepos[(snakepos.length)-a] = snakepos[(snakepos.length-1)-a];
					}
				}

			}
		}
		coordenadas.innerHTML = concatenar
	},time)
})

function finpopup(puntaje,evento){
	var punt = document.getElementsByClassName("punt")
	for(var p=0;p<punt.length;p++){
		punt[p].innerHTML = "Tu puntuacion fue: "+puntaje
	}
	var div = document.createElement("div")
	div.id = "bckhalf"
	if(evento == "ganar"){
		var ganarpopup = document.getElementById('ganarpopup')
		div.appendChild(ganarpopup)
		ganarpopup.style.display = "block"
	}
	else{
		var perderpopup = document.getElementById('perderpopup')
		div.appendChild(perderpopup)
		perderpopup.style.display = "block"
	}
	document.body.appendChild(div)
}

