// @ts-check
import { $, $$, loadTemplate } from '../../app/utils.js';

export default (function ()
{
	class OrbitPlusScale extends HTMLElement 
	{
		constructor ()
		{
			super ();
			console.log ('OrbitPlusScale#constructor');

			let shadow = this.attachShadow ({ mode: 'open' });

			loadTemplate (shadow);
		}
	}

	async function loadTemplate (shadow)
	{
		await loadTemplate ({ path: 'page/results/orbit-plus-scale' })

		const $template = $ ('#orbitplusscale_template');
		const $clone    = document.importNode ($template.content, true);

		shadow.appendChild ($clone);
		animate (shadow);

		// Needed for the DOM to settle
		setTimeout (addScaleCircles.bind (null, shadow), 200);
	}

	/**
	 * We rotate passed element every 3 seconds
	 */
	function animate (shadow)
	{
		const turns = 
		[
			{ transform: 'rotate( 0turn )' },
			{ transform: 'rotate( 1turn )' },
		];

		$ ('.OrbitPlusScale_outer_ring', shadow).animate(turns,
		{
			duration: 3000,
			iterations: Infinity,
		});

		$$ ('.OrbitPlusScale_outer_ring_p2', shadow).forEach (($ring, index) =>
		{
			$ring.animate (turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});

		$$ ('.OrbitPlusScale_outer_ring_p3', shadow).forEach (($ring, index) =>
		{
			$ring.animate (turns,
			{
				duration:   1000 * index + 1000,
				iterations: Infinity,
			});
		});
	}

	function addScaleCircles (shadow)
	{
		const NUMBER_OF_CIRCLES = 4;
		const TOTAL_DURATION    = 5000;

		$$ ('.OrbitPlusScale_scaled_container', shadow).forEach ($container =>
		{
			const { width, height } = $container.getBoundingClientRect ();

			for (let i = 0; i < NUMBER_OF_CIRCLES; i += 1)
			{
				const delay           = Math.random() * 3000;
				const opacityMin      = Math.random() * 0.2; 
				const scaleMin        = Math.random() * 0.3; 
				const scaleMax        = Math.random() * 0.2 + 0.5;
				const x               = (width * Math.random () - (width / 2)) + 'px';
				const y               = (height * Math.random () - (width / 2)) + 'px';
				const duration        = Math.random () * 500 + 900;
				const endDelay        = TOTAL_DURATION - delay - duration;
				const classPosibility = Math.random ();

				const $circle = document.createElement ('div');
				$circle.classList.add ('OrbitPlusScale_scale_circle');

				Object.assign ($circle.style, 
				{
					left:      x,
					top:       y,
					opacity:   opacityMin,
					scale:     scaleMin,
					width:     width + 'px',
					height:    height + 'px',
					transform: `scale (${ scaleMin })`,
				});

				if (classPosibility < 0.2)
					$circle.classList.add ('OrbitPlusScale_scale_circle_white');
				
				if (classPosibility > 0.8)
					$circle.classList.add ('OrbitPlusScale_scale_circle_blue');

				$container.appendChild ($circle);

				const animationProperties =
				{
					delay,
					duration,
					endDelay,
					iterations: Infinity,
					easing:     'ease-out',
				};

				$circle.animate (
				[
					{ opacity: 0, offset: 0 },
					{ opacity: opacityMin, offset: 0.05 },
					{ opacity: 1, offset: 0.7 },
					{ opacity: 1, offset: 0.8 },
					{ opacity: 0, offset: 1 },
				], animationProperties);

				$circle.animate (
				[
					{ transform: `scale (${ scaleMin })` },
					{ transform: `scale (${ scaleMax })`, offset: 0.7 },
					{ transform: `scale (${ scaleMax })` },
				], animationProperties);
			}
		});
	}

	customElements.define ('orbit-plus-scale', OrbitPlusScale);
})();
