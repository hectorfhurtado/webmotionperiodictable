(function ()
{
	const App =
	{
		init,
	};

	/**
	 * We load al main two components
	 * Add an event listener for the custom event on table to load information on Page
	 */
	function init()
	{
		console.log( 'App#init' );

		const $main = document.querySelector( 'main' );
		$main.addEventListener( 'cellClicked', cellClickedHandler, true )

		Nando.load({ module: 'table' })
			.then(() => Nando.table.init() );

		Nando.load({ module: 'page' })
			.then( () => Nando.page.init() );
	}

	/**
	 * We pass needed information to Page to load motion explanation
	 * @param	{Object}	event
	 */
	function cellClickedHandler( event )
	{
		const { cellName, dimensions } = event.detail;

		Nando.page.show({ cellName, dimensions });
	}

	Object.assign( Nando, { app: App });
})();