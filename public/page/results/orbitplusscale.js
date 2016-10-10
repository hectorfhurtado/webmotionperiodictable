(function ()
{
	// Exported functions
	const OrbitPlusScale =
	{
		appendTo,
	};

	// TODO: _Go with sclaed circles

	/**
	 * We can append this html on any element and then call its animation method
	 * @param	{Object}	$orbitPlusScale	A DOMElement reference
	 */
	function appendTo( $orbitPlusScale )
	{
		console.log( 'OrbitPlusScale#appendTo' );

		$orbitPlusScale.innerHTML = 
		`
		${ insertStyles() }
		<div class="Cell_canvas OrbitPlusScale_container">
			<div>
				<label>P1</label>
				<div class="OrbitPlusScale_animation">
					<div class="OrbitPlusScale_outer_ring">
						<div class="OrbitPlusScale_atom2"></div>
						<div class="OrbitPlusScale_atom1"></div>
					</div>
					<div class="OrbitPlusScale_inner_rings"></div>
					<div class="OrbitPlusScale_dashed-lines"></div>
				</div>
				<label>#Ernest Allen</label>
			</div>
			<div>
				<label>P2</label>
				<div class="OrbitPlusScale_animation">
					<div class="OrbitPlusScale_outer_ring_p2">
						<div class="OrbitPlusScale_atom"></div>
					</div>
					<div class="OrbitPlusScale_outer_ring_p2">
						<div class="OrbitPlusScale_atom"></div>
					</div>
					<div class="OrbitPlusScale_outer_ring_p2">
						<div class="OrbitPlusScale_atom"></div>
					</div>
					<div class="OrbitPlusScale_inner_rings"></div>
					<div class="OrbitPlusScale_dashed-lines"></div>
				</div>
				<label>#Lillian Leija</label>
			</div>
			<div>
				<label>P3</label>
				<div class="OrbitPlusScale_animation">
					<div class="OrbitPlusScale_outer_ring_p3">
						<div class="OrbitPlusScale_atom3"></div>
					</div>
					<div class="OrbitPlusScale_outer_ring_p3">
						<div class="OrbitPlusScale_atom3"></div>
					</div>
					<div class="OrbitPlusScale_outer_ring_p3">
						<div class="OrbitPlusScale_atom3"></div>
					</div>
					<div class="OrbitPlusScale_outer_ring_p3">
						<div class="OrbitPlusScale_atom3"></div>
					</div>
					<div class="OrbitPlusScale_inner_rings"></div>
					<div class="OrbitPlusScale_dashed-lines"></div>
				</div>
				<label>#James Doyle</label>
			</div>
		</div>
		`;

		animate( $orbitPlusScale );
	}

	/**
	 * I first tested this styles on the CSS file, then write them down here.
	 * When WebComponents kick in this can be a good practice, right?
	 */
	function insertStyles()
	{
		const squareSide = 'calc( 25rem / 3 )';

		const styles =
		`
		<style>
			.OrbitPlusScale_container
			{
				display: flex;
				flex-direction: row;
			}
			
			.OrbitPlusScale_container > div
			{
				flex-grow:       1;
				display:         flex;
				flex-direction:  column;
				justify-content: center;
				object-fit:      contain;
				position:        relative;
			}

			.OrbitPlusScale_container label
			{
				font-family:  serif;
				color:        var(--line-dimmed);
				padding-left: 1rem;
			}

			.OrbitPlusScale_container label:last-child
			{
				transform: translateY( -1rem );
			}

			.OrbitPlusScale_animation
			{
				width:    ${ squareSide };
				position: relative;
				height:   ${ squareSide };
			}

			.OrbitPlusScale_outer_ring,
			.OrbitPlusScale_outer_ring_p2,
			.OrbitPlusScale_outer_ring_p3
			{
				width:         calc(100% - 2rem);
				height:        calc(100% - 2rem);
				border:        solid thin var(--line-dimmed);
				margin:        0 1rem;
				border-radius: 50%;
				position:      relative;
			}

			.OrbitPlusScale_outer_ring_p2,
			.OrbitPlusScale_outer_ring_p3
			{
				position: absolute;
			}

			.OrbitPlusScale_outer_ring_p2:not(:first-child),
			.OrbitPlusScale_outer_ring_p3:not(:first-child)
			{
				border: solid thin transparent;
			}

			.OrbitPlusScale_atom,
			.OrbitPlusScale_atom1,
			.OrbitPlusScale_atom2,
			.OrbitPlusScale_atom3
			{
				height:           1rem;
				width:            1rem;
				background-color: hsl(33, 50%, 39%);
				border-radius:    50%;
				position:         absolute;
				left:             calc( 50% - 0.5rem);
			}

			.OrbitPlusScale_atom,
			.OrbitPlusScale_atom1,
			.OrbitPlusScale_atom3
			{
				top: -0.5rem;
			}

			.OrbitPlusScale_atom2
			{
				bottom: -0.5rem;
			}

			.OrbitPlusScale_atom 
			{
				background-color: hsl(357, 42%, 41%);
			}

			.OrbitPlusScale_atom3 
			{
				background-color: hsl(56, 39%, 42%);
			}

			.OrbitPlusScale_inner_rings,
			.OrbitPlusScale_inner_rings::after
			{
				position:      absolute;
				top:           1rem;
				bottom:        3rem;
				left:          2rem;
				right:         2rem;
				border-radius: 50%;
				border:        solid var(--line-dimmed);
			}

			.OrbitPlusScale_inner_rings::after
			{
					content: '';
					display: block;
					top:     1rem;
					bottom:  1rem;
					left:    1rem;
					right:   1rem;
			}

			.OrbitPlusScale_dashed-lines,
			.OrbitPlusScale_dashed-lines::after
			{
				    width: calc( 100% - 2rem );
					height:   calc( 100% - 2rem );
					position: absolute;
					top:      0;
					left:     50%;
			}

			.OrbitPlusScale_dashed-lines
			{
				border-left: dashed thin var(--line-dimmed); 
			}

			.OrbitPlusScale_dashed-lines::after
			{
				content:    '';
				display:    block;
				top:        50%;
				left:       -50%;
				border-top: dashed thin var(--line-dimmed);
				width:      100%; 
			}
		</style>
		`;

		return styles;
	}

	/**
	 * We rotate passed element every 3 seconds
	 */
	function animate( $orbitPlusScale )
	{
		const turns = 
		[
			{ transform: 'rotate( 0turn )' },
			{ transform: 'rotate( 1turn )' },
		];

		$( '.OrbitPlusScale_outer_ring', $orbitPlusScale ).animate( turns,
		{
			duration: 3000,
			iterations: Infinity,
		});

		$$( '.OrbitPlusScale_outer_ring_p2', $orbitPlusScale ).forEach(( $ring, index ) =>
		{
			$ring.animate( turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});

		$$( '.OrbitPlusScale_outer_ring_p3', $orbitPlusScale ).forEach(( $ring, index ) =>
		{
			$ring.animate( turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});
	}

	Object.assign( Nando.page.results, { orbitplusscale: OrbitPlusScale });
})();
