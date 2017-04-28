(function ()
{
	class Scale extends HTMLElement
	{
		constructor()
		{
			super();
			console.log( 'Scale#constructor' );

			let shadow = this.attachShadow({ mode: 'open' });

			appendTo( shadow );
		}
	}

	customElements.define( 'scale-cell', Scale );
})();