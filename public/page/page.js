(function ()
{
	let shadow = null;

	class Page extends HTMLElement {

		constructor()
		{
			super();

			console.log( 'Page#init' );

			shadow              = this.attachShadow({ mode: 'open' });
			const $pageTemplate = $( '#Page-template' );

			shadow.appendChild( document.importNode( $pageTemplate.content, true ));
			$pageTemplate.parentNode.removeChild( $pageTemplate );
		}

		static get observedAttributes()
		{
			return [ 'show' ];
		}

		attributeChangedCallback( name, oldValue, newValue ) 
		{
			if (name == 'show' && newValue)
			{
				window.scroll( 0, 0 );
				show({ cellName: newValue });
			}
		}

		connectedCallback()
		{
			$( '.Page_back', shadow ).addEventListener( 'click', pageBackClickHandler, true );
			shadow.addEventListener( 'click', pageClickHandler, true );
		}
	}

	/**
	 * We fetch JSON information for clicked cell and start position received information on screen
	 */
	async function show({ cellName })
	{
		if ($( '.Page .Page_title', shadow ).textContent == cellName)
		{
			revealAllGroups();
			return null;
		}

		const resultJson = await fetch( `page/explanations/${ cellName }.json` );
		const result     = await resultJson.json();
			
		hideAllGroups();
		fillPage( result );

		const $pageName = $( '.Page_name', shadow );
		$pageName.innerHTML = `<${ cellName }-cell></${ cellName }-cell>`;
	}

	/**
	 * Fills the page woth information obtained from server
	 * @param	{Object}	information
	 */
	function fillPage( information )
	{
		const { title, description, createMethod, application, samples, similar } = information;

		$( '.Page_title', shadow ).innerHTML        = title;
		$( '.Page_description', shadow ).innerHTML  = description.map( line => `<p>${ line }</p>` ).join( '' );
		$( '.Page_createMethod', shadow ).innerHTML = createMethod.map( line => `<p>${ line }</p>` ).join( '' );

		loadSamples( samples );
		renderApplication( application );
		renderSamples( samples );
		renderSimilar( similar );

		revealAllGroups();
	}

	async function loadSamples( samples )
	{
		await samples.map( sample => Nando.load({ path: `page/results/${ sample }` }));
	}

	function hideAllGroups()
	{
		$$( '.Page_group', shadow ).forEach( $pageGroup => $pageGroup.style.opacity = 0 );
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

		$$( '.Page_group', shadow ).forEach(( $pageGroup, index ) =>
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
		$( '.Page_application', shadow ).innerHTML = application.map( function (app)
		{
			let markup = `
				<p>${ app.description }</p>
				<div class="Page_application_cells horizontal">
					${ inserPageCells( app.cells ) }
					<div class="plus">&#9658;</div>
					<div class="Page_result ${ app.result }">
						<${ app.result }></${ app.result }>
					</div>					
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
			.map( cellName => 
			`<div class="Page_cell ${ cellName }">
				<${ cellName }-cell></${ cellName }-cell>
			</div>
			` )
			.join( '<div class="plus">+</div>' );
	}

	function renderSamples( samples )
	{
		$( '.Page_samples', shadow ).innerHTML = samples
			.reduce(( previousCell, currentCell ) => `${ previousCell }
				<div class="Page_result">
					<${ currentCell }></${ currentCell }>
				</div>
			`, '' );
	}

	function renderSimilar( similar )
	{
		$( '.Page_similar', shadow ).innerHTML = similar
			.reduce(( previousCell, currentCell ) => `${ previousCell }
				<div class="Page_cell">
					<${ currentCell }-cell></${ currentCell }-cell>
				</div>
			`, '' ); 
	}

	function pageBackClickHandler ()
	{
		const customEvent  = new CustomEvent( 'pageBack', { composed: true });

		this.dispatchEvent( customEvent );
		hideAllGroups();
	}

	function pageClickHandler( event )
	{
		if (event.target && /-cell$/i.test( event.target.tagName ))
		{
			const cellName = event.target.tagName.toLowerCase().replace( '-cell', '' );

			this.host.setAttribute( 'show', cellName );
		}
	}

	customElements.define( 'motion-page', Page ); 
})();
