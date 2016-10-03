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

		Names.forEach( name =>
		{
			const module = name.toLowerCase();

			Nando.load({ path: `/table/cells/${ module }` })
				.then( () => Nando.table.cells[ module ].init());
		});
	}

	Object.assign( Nando, { table: Table });
})();
