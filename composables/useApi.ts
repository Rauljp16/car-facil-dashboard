// composables/useApi.ts
export const useApi = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;
    const token = useState<string | null>('token-carfacil');

    const getHeaders = (): Record<string, string> => {
        return token.value
            ? { Authorization: `Bearer ${token.value}` }
            : {};
    };

    const get = async <T>(url: string, options = {}) => {
        return await $fetch<T>(`${baseURL}${url}`, {
            method: 'GET',
            headers: getHeaders(),
            ...options,
        });
    };

    const post = async <T>(url: string, body: any, options = {}) => {
        return await $fetch<T>(`${baseURL}${url}`, {
            method: 'POST',
            body,
            headers: getHeaders(),
            ...options,
        });
    };

    const put = async <T>(url: string, body: any, options = {}) => {
        return await $fetch<T>(`${baseURL}${url}`, {
            method: 'PUT',
            body,
            headers: getHeaders(),
            ...options,
        });
    };

    const del = async <T>(url: string, options = {}) => {
        return await $fetch<T>(`${baseURL}${url}`, {
            method: 'DELETE',
            headers: getHeaders(),
            ...options,
        });
    };

    return { get, post, put, del };
};
