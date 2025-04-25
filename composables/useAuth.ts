import { useState, navigateTo, useRuntimeConfig } from '#app';
import { computed } from 'vue';

export const useAuth = () => {
    // 1. Obtén la configuración en tiempo de ejecución
    const runtimeConfig = useRuntimeConfig();
    // 2. Accede a tu variable pública específica (ajusta 'apiBaseUrl' si la llamaste diferente)
    const apiBase = runtimeConfig.public.apiBase as string; // Asegúrate de que esté definida

    // --- El resto de tu lógica ---
    const token = useState<string | null>('token-carfacil', () => null);
    const isLoggedIn = computed(() => !!token.value); // `!!` convierte el valor a booleano

    const login = async (email: string, password: string) => {
        if (!apiBase) {
            console.error('Error: La URL base de la API no está configurada en runtimeConfig.public');
            return false;
        }
        try {

            const res = await $fetch<{ token: string }>(`${apiBase}/login`, {
                method: 'POST',
                body: { email, password },
            });

            token.value = res.token;

            if (import.meta.client) {
                localStorage.setItem('token-carfacil', res.token);
            }

            return true;

        } catch (error) {
            token.value = null;
            if (import.meta.client) {
                localStorage.removeItem('token-carfacil');
            }
            throw error;
        }
    };

    const logout = () => {
        token.value = null;
        if (import.meta.client) {
            localStorage.removeItem('token-carfacil');
        }
        if (import.meta.client) {
            navigateTo('/login');
        }
    };

    const loadToken = () => {
        if (import.meta.client) {
            const storedToken = localStorage.getItem('token-carfacil');
            if (storedToken && !token.value) {
                token.value = storedToken;
            }
        }
    };

    return {
        token,
        isLoggedIn,
        login,
        logout,
        loadToken
    };
};
