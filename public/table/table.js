// @ts-check
import { $ } from '../app/utils.js';

import Orbit from './cells/orbit.js';
import Offset from './cells/offset.js';
import Vegas from './cells/vegas.js';

export default (function ()
{
	class Table extends HTMLElement
	{
		constructor ()
		{
			super ();

			let shadow           = this.attachShadow ({ mode: 'open' });
			const $tableTemplate = $ ('#Table-template');

			shadow.appendChild (document.importNode ($tableTemplate.content, true));
			$tableTemplate.parentNode.removeChild ($tableTemplate);
		}

		connectedCallback ()
		{
			this.shadowRoot.addEventListener ('click', cellClickEventHandler.bind (this), false);
		}
	}

	/**
	 * Clicking on a cell we look for its dimensions to pass on a custom event. 
	 * We pass the cell name also
	 */
	function cellClickEventHandler (event)
	{
		const cellName    = event.target.tagName.toLowerCase ().replace ('-cell', '');
		const customEvent = new CustomEvent ('cellClicked', { detail: { cellName }, composed: true });

		this.dispatchEvent (customEvent);
	}

	customElements.define ('motion-table', Table);
})();
