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
		$main.addEventListener( 'pageBack', pageBackhandler, true )

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
		const $page  = $( '.Page' );
		const $table = $( '.Table' );

		const animationProperties =
		{
			duration: 300,
			fill:     'forwards',
		};

		const tableAnimation = $table.animate([
			{ opacity: 1 },
			{ opacity: 0 },
		], animationProperties )

		tableAnimation.onfinish = function ()
		{
			$table.style.display = 'none';
			$page.style.display  = 'flex';

			$page.animate([
				{ opacity: 0 },
				{ opacity: 1 },
			], animationProperties );

			Nando.page.show({ cellName, dimensions });
		};
	}

	function pageBackhandler()
	{
		const $page  = $( '.Page' );
		const $table = $( '.Table' );

		const animationProperties =
		{
			duration: 300,
			fill:     'forwards',
		};

		const pageAnimation = $page.animate([
			{ opacity: 1 },
			{ opacity: 0 },
		], animationProperties )

		pageAnimation.onfinish = function ()
		{
			$page.style.display  = 'none';
			$table.style.display = 'flex';

			$table.animate([
				{ opacity: 0 },
				{ opacity: 1 },
			], animationProperties );
		};
	}

	Object.assign( Nando, { app: App });
})();