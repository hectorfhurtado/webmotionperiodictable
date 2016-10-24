(function ()
{
	// Exported functions
	const OffsetPlusScale =
	{
		appendTo,
	};

	function appendTo( $container )
	{
		console.log( 'offsetPlusScale#appendTo' );
	}

	Object.assign( Nando.page.results, { offsetplusscale: OffsetPlusScale });
})();