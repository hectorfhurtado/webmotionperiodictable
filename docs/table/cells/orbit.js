(function ()
{
	// Exported functions
	const Orbit =
	{
		init,
		appendTo,
	};

	/**
	 * We append this HTML onto the corresponding cell on the table 
	 */
	function init()
	{
		console.log('Orbit#init');

		appendTo( Nando.table.$table.querySelector( '.Orbit' ));
	}

	/**
	 * We can append this html on any element and then call its animation method
	 * @param	{Object}	$orbit	A DOMElement reference
	 */
	function appendTo( $orbit )
	{
		const { width } = $orbit.getBoundingClientRect();

		$orbit.innerHTML = 
		`
		${ insertStyles() }
		<div class="Cell_canvas">
			<div 
				class="Orbit_outer_circle" 
				style="height: ${ width * 0.6 }px; width: ${ width * 0.6 }px;"
			>
			</div>
		</div>
		<h2>Orbit</h2>
		`;

		animate( $orbit.querySelector( '.Orbit_outer_circle' ));
	}

	/**
	 * I first tested this styles on the CSS file, then write them down here.
	 * When WebComponents kick in this can be a good practice, right?
	 */
	function insertStyles()
	{
		const INNER_CIRCLE_DIAMETER = '25%';

		const styles =
		`
		<style>
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
	function animate( $outerCircle )
	{
		$outerCircle.animate([
			{ transform: 'rotate( 0turn )', offset: 0 },
			{ transform: 'rotate( 1turn )', offset: 1 },
		],
		{
			duration: 3000,
			iterations: Infinity,
		});
	}

	Object.assign( Nando.table.cells, { orbit: Orbit });
})();
