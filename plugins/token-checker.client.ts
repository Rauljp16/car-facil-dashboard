export default defineNuxtPlugin(() => {
    const auth = useAuth();
    let interval: NodeJS.Timeout | null = null;

    // Función para verificar si el token ha expirado
    const checkTokenExpiration = () => {
        const token = auth.token.value;

        if (!token) {
            // Si no hay token, limpiamos el intervalo
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            return;
        }

        try {
            // El token JWT tiene 3 partes separadas por puntos
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                throw new Error('Token inválido');
            }

            // Decodificar la parte del payload (segunda parte)
            const payload = JSON.parse(atob(tokenParts[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            // Si el token ha expirado, hacer logout y limpiar el intervalo
            if (payload.exp && payload.exp < currentTime) {
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
                auth.logout();
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            auth.logout();
        }
    };

    // Función para iniciar las comprobaciones
    const startChecking = () => {
        // Si ya hay un intervalo activo, no crear otro
        if (interval) return;

        // Verificar inmediatamente
        checkTokenExpiration();

        // Y luego cada 15 minutos
        interval = setInterval(checkTokenExpiration, 900000);
    };

    // Observar cambios en el token
    watch(() => auth.token.value, (newToken) => {
        if (newToken) {
            // Si hay un nuevo token, iniciar las comprobaciones
            startChecking();
        } else {
            // Si el token se elimina, limpiar el intervalo
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    }, { immediate: true });

    // Limpiar el intervalo cuando se desmonte el plugin
    onUnmounted(() => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    });
}); 