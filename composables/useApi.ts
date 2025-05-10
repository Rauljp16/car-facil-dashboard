// composables/useApi.ts
export const useApi = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;
    const token = useState<string | null>('token-carfacil');
    const { logout } = useAuth();

    const getHeaders = (): Record<string, string> => {
        return token.value
            ? { Authorization: `Bearer ${token.value}` }
            : {};
    };

    const handleError = (error: any) => {
        // Verificamos si es un error de autenticación (401)
        if (error.statusCode === 401 || error.status === 401) {
            // Limpiamos el token y redirigimos al login
            logout();
            return;
        }
        throw error;
    };

    const get = async <T>(url: string, options = {}): Promise<T> => {
        if (!baseURL) {
            throw new Error('API base URL no está configurada');
        }

        try {
            const response = await $fetch<T>(`${baseURL}${url}`, {
                method: 'GET',
                headers: getHeaders(),
                ...options,
            });

            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

            return response;
        } catch (error) {
            console.error('Error en la petición GET:', error);
            handleError(error);
            throw error; // Re-lanzamos el error para que pueda ser manejado por el llamador
        }
    };

    const post = async <T>(url: string, body: any, options = {}) => {
        try {
            return await $fetch<T>(`${baseURL}${url}`, {
                method: 'POST',
                body,
                headers: getHeaders(),
                ...options,
            });
        } catch (error) {
            handleError(error);
        }
    };

    const put = async <T>(url: string, body: any, options = {}) => {
        try {
            return await $fetch<T>(`${baseURL}${url}`, {
                method: 'PUT',
                body,
                headers: getHeaders(),
                ...options,
            });
        } catch (error) {
            handleError(error);
        }
    };

    const del = async <T>(url: string, options = {}) => {
        try {
            return await $fetch<T>(`${baseURL}${url}`, {
                method: 'DELETE',
                headers: getHeaders(),
                ...options,
            });
        } catch (error) {
            handleError(error);
        }
    };

    return { get, post, put, del };
};