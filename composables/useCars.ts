// Definimos la interfaz para el tipo de coche
interface Car {
    id: number;
    marca: string;
    modelo: string;
    combustible: string;
    cambio: string;
    anio: number;
    cv: number;
    precio: number;
    puertas: number;
    motor: number;
    plazas: number;
    km: number;
    images: string[];
}

export const useCars = () => {
    const { get } = useApi();
    // Especificamos que cars es un array de Car
    const cars = useState<Car[]>('cars', () => []);
    // Estado para controlar si los datos están cargados
    const isLoaded = useState<boolean>('cars-loaded', () => false);

    // Función para cargar los coches
    const loadCars = async () => {
        if (!isLoaded.value) {
            try {
                console.log('Intentando cargar coches...');
                const data = await get<Car[]>('/coches');

                if (!data || !Array.isArray(data)) {
                    console.error('Datos recibidos no válidos:', data);
                    throw new Error('Formato de datos inválido');
                }

                console.log('Coches cargados exitosamente:', data.length);
                cars.value = data;
                isLoaded.value = true;
            } catch (error) {
                console.error('Error al cargar coches:', error);
                isLoaded.value = false;
                cars.value = [];
                throw error; // Re-lanzamos el error para que pueda ser manejado por el componente
            }
        }
    };

    // Función para actualizar los coches (usada después de crear/editar/eliminar)
    const refreshCars = async () => {
        isLoaded.value = false;
        await loadCars();
    };

    return {
        cars,
        isLoaded,
        loadCars,
        refreshCars
    };
}; 