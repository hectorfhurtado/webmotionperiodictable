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
						display:  block;
						width:    100%;
						height:   100%;
						position: relative;
						overflow: hidden;
					}

					svg
					{
						width:        100%;
						height:       100%;
						stroke:       #17e1dd;
						fill:         none;
						stroke-width: 1;
					}

					#heart-beat-line-shadow { filter: url(#blur-filter); }

					@keyframes move {
						from { transform: translateX(0) }
						to   { transform: translateX(50%) }
					}

					.mask {
						position:         absolute;
						top:              0;
						right:            0;
						bottom:           0;
						left:             -100%;
						animation:        1s move infinite linear;

						background-image: linear-gradient(90deg, 
							var(--app-backgroun-color, white) 0%, transparent 50%, 
							var(--app-backgroun-color, white) 50%, transparent 100%);
					}
				</style>
				<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
					<g>
						<path id="heart-beat-line" d="M0,50 L42.5,50 45,40 47.5,55 50,10 55,90 60,50 62.5,65 65,40 67,50 100,50""></path>
						<use xlink:href="#heart-beat-line" id="heart-beat-line-shadow">
					</g>
					<filter id="blur-filter" x="-4" y="-4" width="200" height="200">
						<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
					</filter>
				</svg>
				<div class="mask"></div>
			`;
		}
	}

	customElements.define ('vegas-plus-glow', VegasPlusGlow);
})();
