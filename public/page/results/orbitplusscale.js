(function ()
{
	// Exported functions
	const OrbitPlusScale =
	{
		appendTo,
	};

	let fetching = false;
	let appendTos = [];

	/**
	 * We can append this html on any element and then call its animation method
	 * @param	{Object}	$orbitPlusScale	A DOMElement reference
	 */
	function appendTo( $orbitPlusScale )
	{
		console.log( 'OrbitPlusScale#appendTo' );

		const $template = $( '#orbitplusscale_template' );

		if (!$template)	
		{
			appendTos.push( $orbitPlusScale );

			if (!fetching)
			{
				fetching = true;

				return fetch( './page/results/orbitplusscale.html' )
					.then( templateRaw => templateRaw.text() )
					.then( template => $( 'body' ).insertAdjacentHTML( 'beforeend', template ))
					.then(() => 
					{
						appendTos.forEach( appendTo );
						appendTos.length = 0;
						fetching = false;
					});
			}
			return;
		}

		const $clone = document.importNode( $template.content, true );
		$orbitPlusScale.appendChild( $clone );

		animate( $orbitPlusScale );
		addScaleCircles( $orbitPlusScale );
	}

	/**
	 * We rotate passed element every 3 seconds
	 */
	function animate( $orbitPlusScale )
	{
		const turns = 
		[
			{ transform: 'rotate( 0turn )' },
			{ transform: 'rotate( 1turn )' },
		];

		$( '.OrbitPlusScale_outer_ring', $orbitPlusScale ).animate( turns,
		{
			duration: 3000,
			iterations: Infinity,
		});

		$$( '.OrbitPlusScale_outer_ring_p2', $orbitPlusScale ).forEach(( $ring, index ) =>
		{
			$ring.animate( turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});

		$$( '.OrbitPlusScale_outer_ring_p3', $orbitPlusScale ).forEach(( $ring, index ) =>
		{
			$ring.animate( turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});
	}

	function addScaleCircles( $orbitPlusScale )
	{
		const NUMBER_OF_CIRCLES = 8;
		const TOTAL_DURATION = 5000;

		$$( '.OrbitPlusScale_animation', $orbitPlusScale ).forEach( $container =>
		{
			for (let i = 0; i < NUMBER_OF_CIRCLES; i += 1)
			{
				const delay = Math.random() * 4000;
				const opacityMin = (Math.random() * 4) * 0.1; 
				const opacityMax = (Math.random() * 3 +  4) * 0.1;
				const scaleMin = (Math.random() * 3) * 0.1; 
				const scaleMax = (Math.random() * 7 + 3) * 0.1;
				const x = ; // TODO: calcular el valor de X y Y tomando en cuenta el tamano del contenedor 
			}
		});
	}

	Object.assign( Nando.page.results, { orbitplusscale: OrbitPlusScale });
})();
