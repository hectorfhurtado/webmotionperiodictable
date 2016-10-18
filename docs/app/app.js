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
		const $page  = $( '.Page' );
		const $table = $( '.Table' );

		animateTransition( $table, $page, event.detail )
	}

	function pageBackhandler()
	{
		const $page  = $( '.Page' );
		const $table = $( '.Table' );

		animateTransition( $page, $table );
	}

	function animateTransition( $previous, $next, detail = null )
	{
		const $page  = $( '.Page' );
		const $table = $( '.Table' );

		const animationProperties =
		{
			duration: 300,
			fill:     'forwards',
		};

		const previousAnimation = $previous.animate([
			{ opacity: 1 },
			{ opacity: 0 },
		], animationProperties )

		previousAnimation.onfinish = function ()
		{
			$previous.style.display = 'none';
			$next.style.display     = 'flex';

			$next.animate([
				{ opacity: 0 },
				{ opacity: 1 },
			], animationProperties );

			if (!detail) return;
				
			const { cellName } = detail;
			Nando.page.show({ cellName });
		};
	}

	Object.assign( Nando, { app: App });
})();