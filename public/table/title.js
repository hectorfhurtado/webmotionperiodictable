// @ts-check
export default (function ()
{
	// let shadow = null;

	class Title extends HTMLElement
	{
		constructor ()
		{
			super ();

			this.shadow = this.attachShadow ({ mode: 'open' });

			this.shadow.innerHTML =
			`
			<style>
				h2
				{
					font-size:        0.9rem;
					font-weight:      inherit;
					text-align:       center;
					margin-top:       0.2rem;
					-moz-user-select: none;
					user-select:      none;
					pointer-events:   none;
				}

				h2::first-letter { font-size: 1.5rem; }

				.bigger {
					font-size:     2.75rem;
					margin-top:    0;
					margin-bottom: 0;
				}

				.bigger::first-letter { font-size: 3.75rem; }
			</style>
			<h2>
				<slot></slot>
			</h2>
			`;

		}

		connectedCallback ()
		{
			const $h2       = this.shadow.querySelector ('h2');
			const { width } = $h2.getBoundingClientRect ();

			if (width === 0 || width > 600)
			{
				setTimeout (this.connectedCallback.bind (this), 50);

				return;
			}

			if (width > 150) $h2.classList.add ('bigger');
		}
	}

	customElements.define ('cell-title', Title);
})();
