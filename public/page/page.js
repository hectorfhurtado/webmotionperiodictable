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

		const $pageName = document.querySelector( '.Page_name' );
		Nando.table.cells[ cellname ].appendTo( $pageName );
	}

	function fillPage( information )
	{
		const { title, description, createMethod, application } = information;

		document.querySelector( '.Page_title' ).innerHTML = title;
		document.querySelector( '.Page_description' ).innerHTML = description.map( line => `<p>${ line }</p>` ).join( '' );
		document.querySelector( '.Page_createMethod' ).innerHTML = createMethod.map( line => `<p>${ line }</p>` ).join( '' );

		renderApplication( application );
	}

	function renderApplication( application )
	{
		document.querySelector( '.Page_application' ).innerHTML = application.map( app =>
		{
			// TODO: continuar con la flecha de resultado y el resultado

			let markup = `
				<p>${ app.description }</p>
				<div class="Page_application_cells horizontal">
					${ inserPageCells( app.cells ) }
					<div class="Page_result_arrow"></div>
					<div class="Page_result ${ app.result }"></div>					
				</div>`;

			return markup;
		}).join( '' );
	}

	function inserPageCells( cells )
	{
		return cells.map( cell => `<div class="Page_cell ${ cell }"></div>` ).join( '<div class="plus">+</div>' );
	}

	Object.assign( Nando, { page: Page });
})();
