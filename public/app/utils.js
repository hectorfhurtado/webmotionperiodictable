// @ts-check
// Alias for document.querySelect and querySelectorAll
export function $ (selector, context)
{
	return context ? context.querySelector (selector) : document.querySelector (selector);
}
 
export function $$ (selector, context) 
{
	return Array.from (context ? context.querySelectorAll (selector) : document.querySelectorAll (selector));
}

let loading = {};
let loaded  = {};

/**
 * 
 * 
 * @export
 * @param 	{Object<String>} 	{ path = null } 
 * @returns {Promise}
 */
export async function loadTemplate ({ path = null } = {})
{
	if (!path) return Promise.reject ('I need a path to funciton');

	const scriptSource = path + '.html';

	if (loaded  [scriptSource]) return Promise.resolve ();
	if (loading [scriptSource]) return loading [scriptSource];

	loading [scriptSource] = fetch (scriptSource)
		.then (templateRaw =>
		{
			loaded [scriptSource] = true;
			delete loading [scriptSource];

			return templateRaw.text ();
		})
		.then (template => $ ('body').insertAdjacentHTML ('beforeend', template));

	return loading [scriptSource];
}
