// @ts-check
export default (function ()
{
	class Orbit extends HTMLElement
	{
		constructor ()
		{
			super ();

			this.attachShadow ({ mode: 'open' });
		}

		connectedCallback ()
		{
			const { width } = this.parentElement.getBoundingClientRect ();

			this.shadowRoot.innerHTML =
				`
				${ insertStyles () }
				<cell-title>Orbit</cell-title>
				<div class="Cell_canvas">
					<div
						class="Orbit_outer_circle">
					</div>
				</div>
				`;

			animate (this.shadowRoot.querySelector ('.Orbit_outer_circle'));
		}
	}

	/**
	 * I first tested this styles on the CSS file, then write them down here.
	 * When WebComponents kick in this can be a good practice, right?
	 */
	function insertStyles ()
	{
		const INNER_CIRCLE_DIAMETER = '25%';

		// TODO: rework on this. Use SVG
		const styles =
			`
			<style>
				:host {
					width:    100%;
					height:   100%;
					display:  block;
					position: relative;
				}
				.Orbit_outer_circle
				{
					border:        solid thin var( --line-dimmed );
					border-radius: 50%;
					margin:        20%;
					position:      absolute;
					bottom:        0.125rem;
					left:          0;
					right:         0;
					user-select:   none;
					width:         60%;
					height:        43%;
				}

				.Orbit_outer_circle:after
				{
					content:          '';
					display:          block;
					width:            ${ INNER_CIRCLE_DIAMETER };
					height:           ${ INNER_CIRCLE_DIAMETER };
					border-radius:    50%;
					background-color: var( --app-color );
					transform-origin: center;
					transform:        translate( 340%, 150% );
				}
			</style>
			`;

		return styles;
	}

	/**
	 * We rotate passed element every 3 seconds
	 * @param	{Object}	$outerCircle
	 */
	function animate ($outerCircle)
	{
		$outerCircle.animate (
		[
			{ transform: 'rotate( 0turn )', offset: 0 },
			{ transform: 'rotate( 1turn )', offset: 1 },
		],
		{
			duration:   3000,
			iterations: Infinity,
		});
	}

	customElements.define ('orbit-cell', Orbit);
})();
