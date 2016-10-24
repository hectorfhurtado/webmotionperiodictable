(function ()
{
	let cache = {};

	const Page =
	{
		init,
		show,
		results: {},
	};

	/**
	 * Just show we loaded it successfully
	 */
	function init()
	{
		console.log( 'Page#init' );

		backButtonEvent();

		$( '.Page' ).addEventListener( 'click', event =>
		{
			const classList = event.target.classList;

			if (classList.contains( 'Page_cell' ) === false) return;

			const [, cellName ] = Array.from( classList );

			window.scroll( 0, 0 );
			show({ cellName });
		});
	}

	/**
	 * We fetch JSON information for clicked cell and start position received information on screen
	 */
	function show({ cellName })
	{
		if ($( '.Page .Page_title' ).textContent == cellName)
		{
			revealAllGroups();
			return null;
		}

		const cellname = cellName.toLowerCase();

		fetch( `explanations/${ cellname }.json` )
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
		applyResults();
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
			fill:     'both',
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

	function applyResults()
	{
		$$( '.Page .Page_result' )
			.map( $pageResult =>
			{
				const PageResult =
				{
					$pageResult,
					cellName: Array.from( $pageResult.classList ).filter( classlist => classlist != 'Page_result' )[ 0 ]
				};
				return PageResult; 
			})
			.forEach( ({ $pageResult, cellName }) =>
			{
				const module = cellName.toLowerCase();

				if (!Nando.page.results[ module ])
					return Nando.load({ path: `page/results/${ module }`})
						.then(() => appendResult({ $pageResult, module }))
						.catch( error => console.log( error ));

				return appendResult({ $pageResult, module });
			});
	}

	function appendResult({ $pageResult, module })
	{
		Nando.page.results[ module ].appendTo( $pageResult );
	}

	function backButtonEvent()
	{
		$( '.Page_back' ).addEventListener( 'click', event =>
		{
			const customEvent  = new CustomEvent( 'pageBack' );

			$( '.Page' ).dispatchEvent( customEvent );
			hideAllGroups();
		}, true );
	}

	Object.assign( Nando, { page: Page });
})();
