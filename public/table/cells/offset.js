(function ()
{
	class Offset extends HTMLElement 
	{
		constructor()
		{
			super();

			let shadow = this.attachShadow({ mode: 'open' });

			appendTo( shadow );
		}
	}

	function appendTo( $container )
	{
		console.log( 'Offset#appendTo' );

		$container.innerHTML =
		`
		${ insertStyles() }
		<div class="Cell_canvas">
			${ insertHexagon() }
		</div>
		<cell-title>Offset</cell-title>
		`;

		animate( $container.querySelector( '.Offset_hexagon' ));
	}

	function insertStyles()
	{
		const styles =
		`
		<style>
			.Offset_hexagon {
				margin-top:       20%;
				fill:             none;
				stroke:           var( --app-color );
				stroke-width:     8;
				stroke-dasharray: 40;
				stroke-linecap:   round;
				stroke-linejoin:  round;
				transform:        translateY(15%) scale(0.8);
			}
		</style>
		`;

		return styles;
	}

	function insertHexagon()
	{
		const $hexagon = document.getElementById( 'HexagonSvg' );

		return $hexagon.innerHTML.replace( '<svg', '<svg class="Offset_hexagon"' );
	}

	function animate( $hexagon )
	{
		$hexagon.animate(
		[
			{ strokeDashoffset: 80 },
			{ strokeDashoffset: 0 },
		], 
		{
			duration:   500,
			iterations: Infinity,
		});
	}

	customElements.define( 'offset-cell', Offset );
})();
