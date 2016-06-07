function Circulo() {
	var x, y, raio, ini, fim;


	var Circulo = function( contexto, x, y, raio, ini, fim, cor, corLinha ) {
		Desenho.call(this, contexto, cor, corLinha);
		this.x = x;
		this.y = y;
		this.raio = raio;
		this.ini = ini;
		this.fim = fim;
	}

	this.setX = function( x ) {
		this.x = x;
	}

	this.getX = function() {
		return this.x;
	}


	this.setY = function( y ) {
		this.y = y;
	}

	this.getY = function() {
		return this.y;
	}

	this.setRaio = function( raio ) {
		this.raio = raio;
	}

	this.getRaio = function() {
		return this.raio;
	}

	this.setIni = function( ini ) {
		this.ini = ini;
	}

	this.getIni = function() {
		return this.ini;
	}

	this.setFim = function( fim ) {
		this.fim = fim;
	}

	this.getFim = function() {
		return this.fim;
	}

	this.Desenhar = function() {
		this.contexto.fillStyle = this.cor;
		this.contexto.strokeStyle = this.corLinha;
		this.contexto.beginPath();
		this.contexto.arc( this.x, this.y, this.raio, this.ini, this.fim);
		this.contexto.stroke();
	}
}