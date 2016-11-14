(function ()
{
	const Offset =
	{
		init,
		appendTo,
	};

	function init()
	{
		console.log( 'Offset#init' );

		appendTo( Nando.table.$table.querySelector( '.Offset' ));
	}

	function appendTo( $container )
	{
		console.log( 'Offset#');

		$container.innerHTML =
		`
		${ insertStyles() }
		<div class="Cell_canvas">
			${ insertHexagon() }
		</div>
		<h2>Offset</h2>
		`;

		animate( $container.querySelector( '.Offset_hexagon' ));
	}

	function insertStyles()
	{
		const styles =
		`
		<style>
			.Offset_hexagon {
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

	Object.assign( Nando.table.cells, { offset: Offset });
})();
