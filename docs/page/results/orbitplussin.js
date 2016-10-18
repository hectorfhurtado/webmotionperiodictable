(function ()
{
	// Exported functions
	const OrbitPlusSin =
	{
		appendTo,
	};

	let degrees = 259;
	let adding  = false;

	const STEP  = 2.544;

	function appendTo( $orbitPlusSin )
	{
		console.log( 'OrbitPlusSin#appendTo' );

		Nando.loadTemplate({ path: '/page/results/orbitplussin' })
			.then(() => _appendTo( $orbitPlusSin ));
	}

	function _appendTo( $orbitPlusSin )
	{
		const $template = $( '#orbitplussin_template' );
		const $clone    = document.importNode( $template.content, true );
		$orbitPlusSin.appendChild( $clone );

		showDegress( $orbitPlusSin );
	}

	function showDegress( $context )
	{
		if (adding) degrees += STEP;
		else        degrees -= STEP;

		if (degrees > 259) adding = false;
		if (degrees < 100) adding = true;

		try {
			$( '.OrbitPlusSin_label', $context ).textContent = `${ degrees | 0 }°`;
		}
		catch (error)
		{
			console.log( error )
		}

		requestAnimationFrame( showDegress.bind( null, $context ));
	}

	Object.assign( Nando.page.results, { orbitplussin: OrbitPlusSin });
})();