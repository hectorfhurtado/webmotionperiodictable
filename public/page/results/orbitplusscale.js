(function ()
{
	// Exported functions
	const OrbitPlusScale =
	{
		appendTo,
	};

	/**
	 * We can append this html on any element and then call its animation method
	 * @param	{Object}	$orbitPlusScale	A DOMElement reference
	 */
	function appendTo( $orbitPlusScale )
	{
		// TODO: Render the three circles

		$orbitPlusScale.innerHTML = 
		`
		${ insertStyles() }
		<div class="Cell_canvas">
			<div 
				class="Orbit_outer_circle" 
			>
			</div>
		</div>
		`;

		animate( $orbitPlusScale.querySelector( '.Orbit_outer_circle' ));
	}

	/**
	 * I first tested this styles on the CSS file, then write them down here.
	 * When WebComponents kick in this can be a good practice, right?
	 */
	function insertStyles()
	{
		const styles =
		`
		<style>
			
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
