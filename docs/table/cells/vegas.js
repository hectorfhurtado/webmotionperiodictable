(function ()
{
	class Vegas extends HTMLElement
	{
		constructor()
		{
			super();
			console.log( 'Vegas#constructor' );

			let shadow = this.attachShadow({ mode: 'open' });
		}

		connectedCallback()
		{
			this.shadowRoot.innerHTML = `
				<style>
					svg {
						fill: none;
						stroke: white;
						stroke-width: 4;
					}
				</style>
				<div class="Cell_canvas">
					<svg width="100%" height="100%" viewBox="0 0 100 100" >
						<path d="M2,2 L98,2 98,98 2,98 Z"></path>
					</svg>
				</div>
				<cell-title>Vegas</cell-title>
			`;
		}
	}

	customElements.define( 'vegas-cell', Vegas );
})();