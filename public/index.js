
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
	if ('customElements' in window === false)
	{
		const $head   = $( 'head' );
		const $script = document.createElement( 'script' );
		$script.src   = '/vendor/CustomElementsV1.min.js';

		$script.addEventListener( 'load', () => 
		{
			$( 'body' ).dispatchEvent( new CustomEvent( 'customElementsEnabled' ));
			$head.removeChild( $script );
		}, { once: true });

		$head.appendChild( $script );
	}
	else main();

	window.addEventListener( 'DOMContentLoaded', () =>
	{
		$( 'body' ).addEventListener( 'customElementsEnabled', main, { once: true });
	}, { once: true });

	function main()
	{
		console.log( 'custom elements enabled' )
	}

	function load( component )
	{
		// TODO: continue here
	}

	const Nando =
	{
		load,
	};

	return Nando; 
})();