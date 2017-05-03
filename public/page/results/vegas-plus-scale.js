(function ()
{
	class VegasPlusScale extends HTMLElement
	{
		constructor ()
		{
			super ();
			console.log ('VegasPlusScale#constructor');

			const shadow = this.attachShadow ({ mode: 'open' });

			loadTemplate (shadow);
		}
	}

	async function loadTemplate (shadow)
	{
		await Nando.loadTemplate ({ path: 'page/results/vegas-plus-scale' })

		const $template = $ ('#vegasplusscale_template');
		const $clone    = document.importNode ($template.content, true);

		shadow.appendChild ($clone);
	}

	customElements.define ('vegas-plus-scale', VegasPlusScale);
})();
