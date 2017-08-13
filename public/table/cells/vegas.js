// @ts-check
export default (function ()
{
	class Vegas extends HTMLElement
	{
		constructor ()
		{
			super ();
			console.log ('Vegas#constructor');

			let shadow = this.attachShadow ({ mode: 'open' });
		}

		connectedCallback ()
		{
			this.shadowRoot.innerHTML = `
				<style>
					.Cell_canvas {
						width:    100%;
						height:   100%;
						overflow: hidden;
						display:  block;
					}

					.lines-container {
						position:   relative;
						margin:     auto;
						width:      70%;
						height:     40%;
						overflow:   hidden;
					}

					.top {
						position: absolute;
						top:      0;
						left:     0;
						right:    0;
					}

					.right {
						--right-distance: calc(100% - 1.5px);

						transform: translateX(var(--right-distance)) translateY(-5px) rotate(90deg);
						transform-origin: left center;
						overflow: hidden;
					}

					.bottom {
						position: absolute;
						bottom:   0;
						left:     0;
						right:    0;

						transform:        translateX(100%) rotate(180deg);
						transform-origin: left center;
						overflow:         hidden;
					}

					.left {
						--left-distance: calc(100% - 1.5px);
						transform: rotate(270deg) translateY(var(--left-distance)) translateX(-100%);
						transform-origin: left center;
						overflow: hidden;
					}
				</style>
				<cell-title>Vegas</cell-title>
				<div class="Cell_canvas">
					<div class="lines-container">
						<vegas-line class="top"></vegas-line>
						<vegas-line class="right"></vegas-line>
						<vegas-line class="bottom"></vegas-line>
						<vegas-line class="left"></vegas-line>
					</div>
				</div>
			`;
		}
	}

	class VegasLine extends HTMLElement
	{
		constructor ()
		{
			super ();
			console.log ('VegasLine#constructor');

			let shadow = this.attachShadow ({ mode: 'open' });
		}

		connectedCallback ()
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

	customElements.define ('vegas-cell', Vegas);
	customElements.define ('vegas-line', VegasLine);
})();
