(function ()
{
	const Names =
	[
		'Orbit',
		'Offset',
	];

	class Table extends HTMLElement {

		constructor()
		{
			super();

			this.shadow          = this.attachShadow({ mode: 'open' });
			const $tableTemplate = $( '#Table-template' );

			this.shadow.appendChild( document.importNode( $tableTemplate.content, true ));
			$tableTemplate.parentNode.removeChild( $tableTemplate );

			Names.forEach( loadCells );
		}

		connectedCallback()
		{
			this.shadow.addEventListener( 'click', cellClickEventHandler.bind( this ), false );
		}
	}

	/**
	 * All cells are defined relative to table, when loaded we call init which simply add them to its place on the table
	 * @param	{String}	name
	 */
	async function loadCells( name )
	{
		const module = name.toLowerCase();
		await Nando.load({ path: `table/cells/${ module }` });
	}

	/**
	 * Clicking on a cell we look for its dimensions to pass on a custom event. 
	 * We pass the cell name also
	 */
	function cellClickEventHandler( event )
	{
		const cellName    = event.target.tagName.toLowerCase().replace( '-cell', '' );
		const customEvent = new CustomEvent( 'cellClicked', { detail: { cellName }, composed: true });

		this.dispatchEvent( customEvent );
	}

	customElements.define( 'motion-table', Table );
})();
