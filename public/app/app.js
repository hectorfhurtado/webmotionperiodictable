// @ts-check
import { $ } from './utils.js';

import table from '../table/table.js';
import title from '../table/title.js';
import page from  '../page/page.js';

export default (function ()
{
	let shadow = null;

	class App extends HTMLElement
	{
		constructor ()
		{
			super ();

			shadow = this.attachShadow ({ mode: 'open' });

			shadow.innerHTML = `
				<motion-table style="height: 100%;"></motion-table>
				<motion-page style="display: none;"></motion-page>
			`;

			this.init ();
		}

		/**
		 * We load al main two components
		 * Add an event listener for the custom event on table to load information on Page
		 */
		init ()
		{
			console.log ('App#init');

			this.addEventListener ('cellClicked', cellClickedHandler, true);
			this.addEventListener ('pageBack', pageBackhandler, true);
		}
	}

	/**
	 * We pass needed information to Page to load motion explanation
	 * @param	{Object}	event
	 */
	function cellClickedHandler (event)
	{
		const $page  = $ ('motion-page', shadow);
		const $table = $ ('motion-table', shadow);

		$page.setAttribute ('show', event.detail.cellName);
		animateTransition ($table, $page);
	}

	function pageBackhandler ()
	{
		const $page  = $ ('motion-page', shadow);
		const $table = $ ('motion-table', shadow);

		animateTransition ($page, $table);
	}

	async function animateTransition ($previous, $next)
	{
		const animationProperties =
		{
			duration: 300,
			fill:     'forwards',
		};

		const previousAnimation = $previous.animate (
		[
			{ opacity: 1 },
			{ opacity: 0 },
		], animationProperties);

		await previousAnimation.finished; 

		$previous.style.display = 'none';
		$next.style.display     = 'flex';

		$next.animate (
		[
			{ opacity: 0 },
			{ opacity: 1 },
		], animationProperties);
	}

	customElements.define ('motion-periodic-table', App);
})();
