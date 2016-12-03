(function ()
{
	let degrees = 259;
	let adding  = false;

	const STEP  = 2.544;

	class OrbitPlusSin extends HTMLElement
	{
		constructor()
		{
			super();
			console.log( 'OrbitPlusSin#constructor' );

			let shadow = this.attachShadow({ mode: 'open' });

			appendTemplate( shadow );
		}
	}

	async function appendTemplate( shadow ) 
	{
		await Nando.loadTemplate({ path: 'page/results/orbit-plus-sin' });
		
		const $template = $( '#orbitplussin_template' );
		const $clone    = document.importNode( $template.content, true );

		shadow.appendChild( $clone );
		animate( shadow );
	}

	function animate( shadow )
	{
		const $pendulum = $( '.OrbitPlusSin_pendulum', shadow );

		const animation = $pendulum.animate(
		[
			{ 'transform': 'rotate( 0 )' },
			{ 'transform': 'rotate( -158deg )' },
		],
		{
			duration: 1000,
			iterations: Infinity,
			easing: 'ease-in-out',
			direction: 'alternate',
		});

		showDegress( shadow, animation );
	}

	/**
	 * It shows the degrees label, we use the animation object to know how many degrees to show
	 * @param	{DOMElement}	$context
	 * @param	{Object}		animation
	 */
	function showDegress( $context, animation )
	{
		const currentPlayedTime = animation.currentTime % 2000; 
		const currentInSeconds = currentPlayedTime / 1000;

		if (currentInSeconds < 1)
			$( '.OrbitPlusSin_label', $context ).textContent = `${ 100 + 159 * currentInSeconds | 0 }°`;
		else
		{
			const correction = 1 - (currentInSeconds - 1);
			$( '.OrbitPlusSin_label', $context ).textContent = `${ 100 + 159 * correction | 0 }°`;
		}

		requestAnimationFrame( showDegress.bind( null, $context, animation ));
	}

	customElements.define( 'orbit-plus-sin', OrbitPlusSin );
})();