(function ()
{
	const Names =
	[
		'Orbit',
	];

	const Table =
	{
		init,
		cells: {},
	};

	function init()
	{
		console.log('Table#init');

		this.$table = document.querySelector( '.Table' );
		this.$table.addEventListener( 'click', cellClickEventHandler.bind( this ), false );

		Names.forEach( loadCels );
	}

	function loadCels( name )
	{
		const module = name.toLowerCase();

		Nando.load({ path: `/table/cells/${ module }` })
			.then( () => Nando.table.cells[ module ].init());
	}

	function cellClickEventHandler( event )
	{
		if (event.target.classList.contains( 'Table_cell') === false) return;

		const dimensions   = event.target.getBoundingClientRect();
		const [ cellName ] = Array.from( event.target.classList ).filter( classList => classList !== 'Table_cell' ); 
		const customEvent  = new CustomEvent( 'cellClicked', { detail: { dimensions, cellName }});

		this.$table.dispatchEvent( customEvent );
	}

	Object.assign( Nando, { table: Table });
})();
