(function ()
{
	class VegasPlusGlow extends HTMLElement
	{
		constructor ()
		{
			super ();
			console.log ( 'VegasPlusGlow#constructor' );

			this.attachShadow({ mode: 'open' });
		}

		connectedCallback ()
		{
			this.shadowRoot.innerHTML = `
				<style>
					:host
					{
						display: block;
						width:   100%;
						height:  100%;
					}

					svg
					{
						width:        100%;
						height:       100%;
						stroke:       #17e1dd;
						fill:         none;
						stroke-width: 1;
					}
				</style>
				<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
					<g>
						<path d="M0,50 L42.5,50 45,40 47.5,55 50,10 55,90 60,50 62.5,65 65,40 67,50 100,50""></path>
					</g>
				</svg>
			`;
		}
	}

	customElements.define ('vegas-plus-glow', VegasPlusGlow);
})();
