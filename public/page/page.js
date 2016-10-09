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
			.then( fillPage );

		hideAllGroups();

		const $pageName = $( '.Page_name' );
		Nando.table.cells[ cellname ].appendTo( $pageName );
	}

	/**
	 * Fills the page woth information obtained from server
	 * @param	{Object}	information
	 */
	function fillPage( information )
	{
		const { title, description, createMethod, application, samples, similar } = information;

		$( '.Page_title' ).innerHTML        = title;
		$( '.Page_description' ).innerHTML  = description.map( line => `<p>${ line }</p>` ).join( '' );
		$( '.Page_createMethod' ).innerHTML = createMethod.map( line => `<p>${ line }</p>` ).join( '' );

		renderApplication( application );
		renderSamples( samples );
		renderSimilar( similar );

		revealAllGroups();
		applyCells();
	}

	function hideAllGroups()
	{
		$$( '.Page_group' ).forEach( $pageGroup => $pageGroup.style.opacity = 0 );
	}

	function revealAllGroups()
	{
		const properties =
		[
			{ opacity: 0 },
			{ opacity: 1 },
		];

		const options =
		{
			fill:     'forwards',
			easing:   'ease-in-out',
			duration: 300,
		};

		$$( '.Page_group' ).forEach(( $pageGroup, index ) =>
		{
			options.delay = 300 * index;

			$pageGroup.animate( properties, options );
		});
	}

	/**
	 * Renders the application part of the information Object
	 * @param	{Object}	application
	 */
	function renderApplication( application )
	{
		$( '.Page_application' ).innerHTML = application.map( function (app)
		{
			let markup = `
				<p>${ app.description }</p>
				<div class="Page_application_cells horizontal">
					${ inserPageCells( app.cells ) }
					<div class="plus">&#9658;</div>
					<div class="Page_result ${ app.result }"></div>					
				</div>`;

			return markup;
		}).join( '' );
	}

	/**
	 * Insert Page examples separated by a plus sign
	 * @param	{Array}	cells
	 * @returns	String
	 */
	function inserPageCells( cells )
	{
		return cells
			.map( cell => `<div class="Page_cell ${ cell }"></div>` )
			.join( '<div class="plus">+</div>' );
	}

	function renderSamples( samples )
	{
		$( '.Page_samples' ).innerHTML = samples
			.reduce(( previousCell, currentCell ) => `${ previousCell }<div class="Page_result ${ currentCell }"></div>`, '' );
	}

	function renderSimilar( similar )
	{
		$( '.Page_similar' ).innerHTML = similar
			.reduce(( previousCell, currentCell ) => `${ previousCell }<div class="Page_cell ${ currentCell }"></div>`, '' ); 
	}

	/**
	 * Once all Page cells graphics are inserted, we look for all these elements and start rendering them based on their
	 * classes
	 */
	function applyCells()
	{
		$$( '.Page .Page_cell' )
			.filter( $pageCell => $pageCell.classList.contains( 'Page_name' ) === false )
			.map( $pageCell =>
			{
				const PageCell =
				{
					$pageCell,
					cellName: Array.from( $pageCell.classList ).filter( classlist => classlist != 'Page_cell' )[ 0 ]
				};
				return PageCell; 
			})
			.forEach( ({ $pageCell, cellName }) =>
			{
				try
				{
					Nando.table.cells[ cellName.toLowerCase() ].appendTo( $pageCell );
				}
				catch( e )
				{
					console.log( `${ cellName } not yet implemented` );
				}
			});
	}

	Object.assign( Nando, { page: Page });
})();
