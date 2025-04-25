// plugins/auth-init.client.ts
export default defineNuxtPlugin(() => {
    const auth = useAuth();

    auth.loadToken();
});
