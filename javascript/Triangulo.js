function Triangulo() {
	var x, y, lar, alt;


	var Triangulo = function( x, y, lar, alt ) {
		this.x = x;
		this.y = y;
		this.lar = lar;
		this.alt = alt;
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

	this.setLar = function( lar ) {
		this.lar = lar;
	}

	this.getLar = function() {
		return this.lar;
	}

	this.setAlt = function( alt ) {
		this.alt = alt;
	}

	this.getAlt = function() {
		return this.alt;
	}

	this.Desenhar = function() {
		this.contexto.fillStyle = this.cor;
		this.contexto.strokeStyle = this.corLinha;
		this.contexto.beginPath();
		this.contexto.moveTo( this.x, this.y );
		this.contexto.lineTo( this.x + this.larg / 2, this.y + this.alt );
		this.contexto.lineTo( this.x - this.larg / 2, this.y + this.alt );
		this.contexto.closePath();
		this.contexto.fill();
	}

}