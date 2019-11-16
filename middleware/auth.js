export default function (context) {
    console.log('[MW] Auth ran');
    
    if (!context.store.getters.isAuthenticated) {
        context.redirect('/admin/auth')        
    }
}