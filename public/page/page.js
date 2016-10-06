(function ()
{
	let cache = {};

	const Page =
	{
		init,
		show,
	};

	/**
	 * Just show we loaded it successfully
	 */
	function init()
	{
		console.log( 'Page#init' );
	}

	/**
	 * We fetch JSON information for clicked cell and start position received information on screen
	 */
	function show({ cellName, dimensions })
	{
		const cellname = cellName.toLowerCase();

		fetch( `/explanations/${ cellname }.json` )
			.then( result => result.json())
			.then( information => console.log( information ));

		const $pageName = document.querySelector( '.Page_name' );
		Nando.table.cells[ cellname ].appendTo( $pageName );
	}

	Object.assign( Nando, { page: Page });
})();
