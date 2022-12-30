var canvas = document.getElementById("canvas");
var tamrango = document.getElementById("tamrango");
var tamtexto = document.getElementById("tamtexto");
tamtexto.innerHTML = tamrango.value

var size=parseInt(tamrango.value);
draw(size)

var velrango = document.getElementById("velrango");
var veltexto = document.getElementById("veltexto");
veltexto.innerHTML = velrango.value


tamrango.addEventListener("input",function(){
	tamtexto.innerHTML = this.value
	size = parseInt(this.value)
	draw(size)
})

velrango.addEventListener("input",function(){
	veltexto.innerHTML = this.value
	vel = parseInt(this.value)
})


function draw(xy){
	canvas.innerHTML = "";
	for (var i=0;i<xy;i++){
		var fila = document.createElement("div")
		fila.className = "fila"
		canvas.appendChild(fila)
		for(var j=0;j<xy;j++){
			var div = document.createElement("div")
			div.className = "cell"
			div.title = i+","+j
			fila.appendChild(div)
		}
			
	}
}
