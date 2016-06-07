function Retangulo() {
	var x1, y1, x2, y2;


	var Retangulo = function( contexto, x1, y1, x2, y2, cor, corLinha ) {
		Desenho.call(this, contexto, cor, corLinha );
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	this.setX1 = function( x1 ) {
		this.x1 = x1;
	}

	this.getX1 = function() {
		return this.x1;
	}

	this.setY1 = function( y1 ) {
		this.y1 = y1;
	}

	this.getY1 = function() {
		return this.y1;
	}

	this.setX2 = function( x2 ) {
		this.x2 = x2;
	}

	this.getX2 = function() {
		return this.x2;
	}

	this.setY2 = function( y2 ) {
		this.y2 = y2;
	}

	this.getY2 = function() {
		return this.y2;
	}

	this.Desenhar = function() {
		this.contexto.fillStyle = this.cor;
		this.contexto.strokeStyle = this.corLinha;
		this.contexto.fillRect( this.x1, this.y1, this.x2, this.y2);
	}
}