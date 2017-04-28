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
					.Cell_canvas {
						width: 100%;
						height: 100%;
						overflow: hidden;
					}

					.right { transform: rotate(90deg) }
				</style>
				<div class="Cell_canvas">
					<vegas-line></vegas-line>
					<vegas-line class="right"></vegas-line>
				</div>
				<cell-title>Vegas</cell-title>
			`;
		}
	}

	class VegasLine extends HTMLElement {
		constructor()
		{
			super();
			console.log( 'VegasLine#constructor' );

			let shadow = this.attachShadow({ mode: 'open' });
		}

		connectedCallback()
		{
			this.shadowRoot.innerHTML = `
				<style>
					@keyframes move {
						from {
							transform: translateX(-50%);
						}

						to {
							transform: translateX(0);
						}
					}

					:host { display: block }

					div {
						display: block;
						width:   200%;
						height:  3px;
						background-image: linear-gradient(90deg, 
							hsl(0, 0%, 100%), hsla(0, 0%, 0%, 0) 50%, 
							hsl(0, 0%, 100%) 50%, hsla(0, 0%, 0%, 0) 100%
						);

						animation: 0.5s move infinite linear;
					}
				</style>
				<div></div>
			`;
		}
	}

	customElements.define( 'vegas-cell', Vegas );
	customElements.define( 'vegas-line', VegasLine );
})();
