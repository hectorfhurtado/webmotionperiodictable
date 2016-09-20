
// Alias for document.querySelect and querySelectorAll
function $( selector, context )
{
	return context ? context.querySelector( selector ) : document.querySelector( selector );
}
 
function $$( selector, context ) 
{
	return Array.from( context ? context.querySelectorAll( selector ) : document.querySelectorAll( selector ));
}

window.Nando = (function ()
{
	window.addEventListener( 'DOMContentLoaded', () =>
	{
		main();
	}, { once: true });
	
	function main()
	{
		load({ module: 'app' })
			.then(() =>
			{
				Nando.app.init();
			});
	}

	function load({ module })
	{
		if (!!Nando[ module ])
			return Promise.resolve();

		return new Promise( resolve =>
		{
			const $head   = $( 'head' );
			const $script = document.createElement( 'script' );
			$script.src   = `/${ module }/${ module }.js`;

			$script.addEventListener( 'load', () => 
			{
				$head.removeChild( $script );
				resolve();
			}, { once: true });

			$head.appendChild( $script );
		});
	}

	const Nando =
	{
		load,
	};

	return Nando; 
})();