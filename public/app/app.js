(function ()
{
	class App extends HTMLElement
	{
		constructor()
		{
			super();

			// Attach a shadow root to the element.
			this._shadowRoot = this.attachShadow({ mode: 'open' });

			this._shadowRoot.innerHTML = `
				<link rel="stylesheet" href="js/app/app.css">
				<nando-universe></nando-universe>
				<slot></slot>
			`;

			Nando.Cargador.trae( 'universe' );
		}

		connectedCallback()
		{
			console.log( 'Hola desde App' );
		}
	}

	customElements.define( 'nando-app', App );
})();