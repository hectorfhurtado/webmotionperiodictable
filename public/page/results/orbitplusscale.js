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

		// Needed for the DOM to settle
		setTimeout( function ()
		{
			addScaleCircles( $orbitPlusScale );
		}, 100 );
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
		const NUMBER_OF_CIRCLES = 4;
		const TOTAL_DURATION    = 5000;
		const RADIUS            = '16'; // ~1rem

		$$( '.OrbitPlusScale_scaled_container', $orbitPlusScale ).forEach( $container =>
		{
			const { width, height } = $container.getBoundingClientRect();

			for (let i = 0; i < NUMBER_OF_CIRCLES; i += 1)
			{
				const delay           = Math.random() * 3000;
				const opacityMin      = Math.random() * 0.2; 
				const scaleMin        = Math.random() * 0.3; 
				const scaleMax        = Math.random() * 0.2 + 0.5;
				const x               = (width * Math.random() - (width / 2)) + 'px';
				const y               = (height * Math.random() - (width / 2)) + 'px';
				const duration        = Math.random() * 500 + 900;
				const endDelay        = TOTAL_DURATION - delay - duration;
				const classPosibility = Math.random();

				const $circle = document.createElement( 'div' );
				$circle.classList.add( 'OrbitPlusScale_scale_circle' );
				$circle.style.left      = x;
				$circle.style.top       = y;
				$circle.style.opacity   = opacityMin;
				$circle.style.scale     = scaleMin;
				$circle.style.width     = width + 'px';
				$circle.style.height    = height + 'px';
				$circle.style.transform = `scale( ${ scaleMin })`;

				if (classPosibility < 0.2)
					$circle.classList.add( 'OrbitPlusScale_scale_circle_white' );
				
				if (classPosibility > 0.8)
					$circle.classList.add( 'OrbitPlusScale_scale_circle_blue' );

				$container.appendChild( $circle );
				
				$circle.animate(
				[
					{ opacity: 0, transform: 'scale(0)', offset: 0 },
					{ opacity: opacityMin, transform: `scale(${ scaleMin })`, offset: 0.05 },
					{ opacity: 1, transform: `scale(${ scaleMax })`, offset: 0.7 },
					{ opacity: 1, transform: `scale(${ scaleMax })`, offset: 0.8 },
					{ opacity: 0, transform: `scale(${ scaleMax })`, offset: 1 },
				], {
					delay,
					duration,
					endDelay,
					iterations: Infinity,
					easing:     'ease-out',
				});
			}
		});
	}

	Object.assign( Nando.page.results, { orbitplusscale: OrbitPlusScale });
})();
