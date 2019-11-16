export default function (context) {
    // Dispatching as is will not work as middleware codes are run in the server and client.
    // The code ran on the server will fail as there is no localStorage there.
    // Thus, first check at what stage the application is at.
    // This is done by using a Nuxt environment variable 'process.client'
    // Results in a boolean.

    console.log('[MW] check-auth ran');

    // Nuxt code on checking which phase the app is in.
    // if (process.client) {}  

    // HTTP request can be found on context.
    // The request in this instance contains the cookie data.

    context.store.dispatch('initAuth', context.req); 
}