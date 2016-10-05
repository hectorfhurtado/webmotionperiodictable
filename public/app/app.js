(function ()
{
	const App =
	{
		init,
	};

	function init()
	{
		console.log( 'App#init' );

		const $main = document.querySelector( 'main' );

		$main.addEventListener( 'cellClicked', cellClickedHandler, true )

		Nando.load({ module: 'table' })
			.then(() => Nando.table.init() );
	}

	function cellClickedHandler( event )
	{
		// TODO: continuar con la transicion desde la celda a la pagina
		console.log( 'received', event.detail, event.target );
	}

	Object.assign( Nando, { app: App });
})();