(function ()
{
	// let shadow = null;

	class Title extends HTMLElement 
	{
		constructor()
		{
			super();

			this.shadow = this.attachShadow({ mode: 'open' });

			this.shadow.innerHTML = 
			`
			<style>
				h2
				{
					font-size:        0.9rem;
					font-weight:      inherit;
					text-align:       center;
					margin-top:       0.2rem;
					position:         absolute;
					top:              0;
					right:            0;
					left:             0;
					-moz-user-select: none;
					user-select:      none;
					pointer-events:   none;
				}

				h2::first-letter { font-size: 1.5rem; }

				.bigger 
				{
					font-size: 2.75rem;
					margin-top: 0.5rem;
				}

				.bigger::first-letter { font-size: 3.75rem; }
			</style>
			<h2>
				<slot></slot>
			</h2>
			`;

		}

		connectedCallback()
		{
			const $h2       = this.shadow.querySelector( 'h2' );
			const { width } = $h2.getBoundingClientRect();

			if (width > 70) $h2.classList.add( 'bigger' );
		}
	}

	customElements.define( 'cell-title', Title );
})();