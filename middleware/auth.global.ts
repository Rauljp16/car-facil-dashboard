// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {

    if (import.meta.client) {
        const auth = useAuth();

        const isAuthenticated = auth.isLoggedIn.value;
        const isLoginPage = to.path === "/login";
        const isPublicRoute = isLoginPage;

        if (!isAuthenticated && !isPublicRoute) {
            return navigateTo("/login");
        }

        if (isAuthenticated && isLoginPage) {
            return navigateTo("/dashboard");
        }

    }
});
