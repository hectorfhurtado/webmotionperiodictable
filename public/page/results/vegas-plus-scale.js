(function ()
{
	class VegasPlusScale extends HTMLElement
	{
		constructor ()
		{
			super ();
			console.log ('VegasPlusScale#constructor');
		}
	}

	customElements.define ('vegas-plus-scale', VegasPlusScale);
})();
