(function ()
{
	const App =
	{
		init,
	};

	function init()
	{
		console.log( 'App#init' );

		Nando.load({ module: 'table' })
			.then(() => Nando.table.init() );
	}

	Object.assign( Nando, { app: App });
})();