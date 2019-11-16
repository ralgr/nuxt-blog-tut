// Functions executed before a route is loaded.
// Executed on first load and thereafter.
// Needs to be attached to a page or layout component to be executed at all.
// Adding to a specific page requires the creation of the 'middleware' prop in the data object.
// Use brackets to add more than 1 middleware and order is important.
// To add globally, do so in the nuxt.config.js under the 'router' config.
// These functions recieve the context parameter.
// Can be attached to any route in the app or on a per layout or page basis.
// If running async code, return it.

export default function (context) {
    console.log('[Log me up]');
    
}