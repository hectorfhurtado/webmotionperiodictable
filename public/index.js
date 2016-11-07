
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
	window.addEventListener( 'DOMContentLoaded', main, { once: true });
	
	let loading = {};
	let loaded  = {};

	const Nando =
	{
		load,
		loadTemplate,
	};

	async function main()
	{
		await load({ module: 'app' })
		Nando.app.init();
	}

	function load({ module = null, path = null })
	{
		let scriptSource = '';

		if (path)
			scriptSource = path + '.js';

		else if (module)
		{
			if (!!Nando[ module ])
				return Promise.resolve();

			else scriptSource = `${ module }/${ module }.js`; 
		}
		else return Promise.reject( 'I do not have a path or module to work with' );

		if (loading[ scriptSource ]) return loading[ scriptSource ];

		loading[ scriptSource ] = new Promise( resolve =>
		{
			const $head   = $( 'head' );
			const $script = document.createElement( 'script' );
			$script.src   = scriptSource;

			$script.addEventListener( 'load', () => 
			{
				$head.removeChild( $script );
				delete loading[ scriptSource ];
				resolve();
			}, { once: true });

			$head.appendChild( $script );
		});

		return loading[ scriptSource ];
	}

	async function loadTemplate({ path = null })
	{
		if (!path) return Promise.reject( 'I need a path to funciton' );

		const scriptSource = path + '.html';

		if (loaded[ scriptSource ]) return Promise.resolve();
		if (loading[ scriptSource ]) return loading[ scriptSource ];

		loading[ scriptSource ] = fetch( scriptSource )
			.then( templateRaw =>
			{
				loaded[ scriptSource ] = true;
				delete loading[ scriptSource ];

				return templateRaw.text();
			})
			.then( template => $( 'body' ).insertAdjacentHTML( 'beforeend', template ));

		return loading[ scriptSource ];
	}

	return Nando; 
})();
