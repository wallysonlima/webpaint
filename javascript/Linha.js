function Linha() {
	var x, y;


	var Linha = function( contexto, x, y, cor, corLinha ) {
		Desenho.call(this, contexto, cor, CorLinha);
		this.x = x;
		this.y = y;
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

	this.Desenhar = function() {
		alert("entrou sdfdasfsdafds");
		this.contexto.beginPath();
		this.contexto.strokeStyle = this.corLinha;
		this.contexto.lineTo(this.x, this.y);
		this.contexto.stroke();
		this.contexto.closePath();
	}
}