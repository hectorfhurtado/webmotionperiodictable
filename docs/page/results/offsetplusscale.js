(function ()
{
	// Exported functions
	const OffsetPlusScale =
	{
		appendTo,
	};

	async function appendTo( $container )
	{
		console.log( 'offsetPlusScale#appendTo' );

		await Nando.loadTemplate({ path: 'page/results/offsetplusscale' })
		_appendTo( $container );
	}

	/**
	 * We append an hexagon to every container to apply them its animation
	 * @param	{Object}	$container
	 * @private
	 */
	function _appendTo( $container )
	{
		const $offsetTemplate  = $( '#offsetplusscale_template' );
		const $hexagonTemplate = $( '#HexagonSvg' );

		$offsetTemplate.content.querySelector( '.OffsetPlusScale-greenHexagon' )
			.appendChild( document.importNode( $hexagonTemplate.content, true ));

		$offsetTemplate.content.querySelector( '.OffsetPlusScale-innerHexagon' )
			.appendChild( document.importNode( $hexagonTemplate.content, true ));

		$offsetTemplate.content.querySelector( '.OffsetPlusScale-outerHexagon' )
			.appendChild( document.importNode( $hexagonTemplate.content, true ));

		$container.appendChild( document.importNode( $offsetTemplate.content, true ));
	}

	Object.assign( Nando.page.results, { offsetplusscale: OffsetPlusScale });
})();