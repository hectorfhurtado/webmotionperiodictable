// @ts-check
import { $, loadTemplate } from '../../app/utils.js';

export default (function ()
{
	class OffsetPlusScale extends HTMLElement
	{
		constructor ()
		{
			super ();

			console.log ('offsetPlusScale#constructor');

			let shadow = this.attachShadow ({ mode: 'open' });

			appendTeamplate (shadow);
		}
	}

	async function appendTeamplate (shadow)
	{
		await loadTemplate ({ path: 'page/results/offset-plus-scale' })

		const $offsetTemplate  = $ ('#offsetplusscale_template');
		const $hexagonTemplate = $ ('#HexagonSvg');

		$offsetTemplate.content.querySelector ('.OffsetPlusScale-greenHexagon')
			.appendChild (document.importNode ($hexagonTemplate.content, true));

		$offsetTemplate.content.querySelector ('.OffsetPlusScale-innerHexagon')
			.appendChild (document.importNode ($hexagonTemplate.content, true));

		$offsetTemplate.content.querySelector ('.OffsetPlusScale-outerHexagon')
			.appendChild (document.importNode ($hexagonTemplate.content, true));

		shadow.appendChild(document.importNode ($offsetTemplate.content, true));
	}

	customElements.define ('offset-plus-scale', OffsetPlusScale);
})();
