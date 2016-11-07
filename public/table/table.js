(function ()
{
	const Names =
	[
		'Orbit',
		'Offset',
	];

	const Table =
	{
		init,
		cells: {},
	};

	/**
	 * Takes a reference for the table, add an event listener and load all cells
	 */
	function init()
	{
		console.log('Table#init');

		this.$table = document.querySelector( '.Table' );
		this.$table.addEventListener( 'click', cellClickEventHandler.bind( this ), false );

		Names.forEach( loadCels );
	}

	/**
	 * All cells are defined relative to table, when loaded we call init which simply add them to its place on the table
	 * @param	{String}	name
	 */
	async function loadCels( name )
	{
		const module = name.toLowerCase();

		await Nando.load({ path: `table/cells/${ module }` });
		Nando.table.cells[ module ].init();
	}

	/**
	 * Clicking on a cell we look for its dimensions to pass on a custom event. 
	 * We pass the cell name also
	 */
	function cellClickEventHandler( event )
	{
		if (event.target.classList.contains( 'Table_cell') === false) return;

		const [ cellName ] = Array.from( event.target.classList )
			.filter( classList => classList !== 'Table_cell' ); 
		
		const customEvent  = new CustomEvent( 'cellClicked', { detail: { cellName }});

		this.$table.dispatchEvent( customEvent );
	}

	Object.assign( Nando, { table: Table });
})();
