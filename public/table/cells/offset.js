// @ts-check
export default (function ()
{
	class Offset extends HTMLElement 
	{
		constructor ()
		{
			super ();

			let shadow = this.attachShadow ({ mode: 'open' });

			appendTo (shadow);
		}
	}

	function appendTo ($container)
	{
		console.log ('Offset#appendTo');

		$container.innerHTML =
		`
			${ insertStyles () }
			<cell-title>Offset</cell-title>
			<div class="Cell_canvas">
				${ insertHexagon () }
			</div>
		`;

		animate ($container.querySelector( '.Offset_hexagon'));
	}

	function insertStyles ()
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
					transform:        scale(0.8);
				}
			</style>
		`;

		return styles;
	}

	function insertHexagon ()
	{
		const $hexagon = document.getElementById ('HexagonSvg');

		return $hexagon.innerHTML.replace ('<svg', '<svg class="Offset_hexagon"');
	}

	function animate ($hexagon)
	{
		$hexagon.animate (
		[
			{ strokeDashoffset: 80 },
			{ strokeDashoffset: 0 },
		], 
		{
			duration:   500,
			iterations: Infinity,
		});
	}

	customElements.define ('offset-cell', Offset);
})();
