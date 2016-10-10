(function ()
{
	// Exported functions
	const OrbitPlusSin =
	{
		appendTo,
	};

	function appendTo()
	{
		console.log( 'OrbitPlusSin#appendTo' );
	}

	Object.assign( Nando.page.results, { orbitplussin: OrbitPlusSin });
})();