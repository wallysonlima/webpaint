function Desenho() {
	var contexto;
	var cor;
	var corLinha;

	var Desenho = function( contexto, cor, corLinha ) {
		this.contexto = contexto;
		this.cor = cor;
		this.corLinha = corLinha;
	}

	this.setContexto = function( contexto ) {
		this.contexto = contexto;
	}

	this.getContexto = function() {
		return this.contexto;
	}

	this.setCor = function( cor ) {
		this.cor = cor;
	}

	this.getCor = function() {
		return this.cor;
	}

	this.setCorLinha = function( corLinha ){
		this.corLinha = corLinha;
	} 

	this.getCorLinha = function() {
		return this.corLinha;
	}
}

