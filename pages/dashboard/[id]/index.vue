<template>
    <div class="w-full min-h-screen bg-neutral-100">
        <div v-if="car" class="w-full bg-white p-4 shadow-sm">
            <!-- Header with back button -->
            <div class="relative mb-6">
                <h1 class="text-2xl font-semibold text-center">{{ car.marca }} {{ car.modelo }}</h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 cursor-pointer" />
            </div>

            <!-- Galería de miniaturas -->
            <div class="mb-6">
                <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    <div v-for="(image, index) in car.images" :key="index"
                        class="aspect-square rounded overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        @click="openImage(image)">
                        <img :src="image" :alt="`${car.marca} ${car.modelo} - Imagen ${index + 1}`"
                            class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <!-- Datos del coche en tarjeta estética sin iconos externos -->
            <div class="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div>
                        <h2 class="text-2xl font-bold mb-1">{{ car.marca }} {{ car.modelo }}</h2>
                        <div class="flex items-center gap-3 text-neutral-500 text-sm">
                            <span>{{ car.anio }}</span>
                            <span>·</span>
                            <span>{{ car.km.toLocaleString() }} km</span>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-blue-600">{{ car.precio.toLocaleString() }} €</div>
                </div>
                <div class="border-t border-neutral-200 my-4"></div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div>
                        <span class="text-neutral-500">Motor:</span>
                        <span class="font-semibold ml-1">{{ car.motor }} cc</span>
                    </div>
                    <div>
                        <span class="text-neutral-500">CV:</span>
                        <span class="font-semibold ml-1">{{ car.cv }}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500">Combustible:</span>
                        <span class="font-semibold ml-1">{{ car.combustible }}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500">Cambio:</span>
                        <span class="font-semibold ml-1">{{ car.cambio }}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500">Puertas:</span>
                        <span class="font-semibold ml-1">{{ car.puertas }}</span>
                    </div>
                    <div>
                        <span class="text-neutral-500">Plazas:</span>
                        <span class="font-semibold ml-1">{{ car.plazas }}</span>
                    </div>
                </div>
                <div v-if="car.descripcion" class="mt-6 text-neutral-700">
                    <span class="font-semibold">Descripción:</span> {{ car.descripcion }}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex gap-4 justify-center">
                <button @click="editarCoche"
                    class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Editar
                </button>
                <button @click="eliminarCoche"
                    class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    Eliminar
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-else class="flex justify-center items-center min-h-[50vh]">
            <p class="text-lg text-neutral-600">Cargando detalles del coche...</p>
        </div>

        <!-- Image Modal -->
        <div v-if="imagenAmpliada"
            class="fixed inset-0 p-2 bg-black bg-opacity-80 flex items-center justify-center z-50"
            @click="imagenAmpliada = null">
            <img :src="imagenAmpliada" class="max-w-full max-h-full rounded shadow-lg" />
        </div>

        <!-- Modal para eliminar coche -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
                <p class="mb-6 text-lg text-neutral-800 font-semibold">¿Estás seguro de que quieres eliminar este coche?
                </p>
                <div class="flex gap-4 justify-center">
                    <button @click="confirmDelete"
                        class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">Sí,
                        eliminar</button>
                    <button @click="cancelDelete"
                        class="px-4 py-2 rounded bg-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-300 transition">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useCars } from '~/composables/useCars';

const route = useRoute();
const router = useRouter();
const { get, del } = useApi();
const { refreshCars } = useCars();

const car = ref(null);
const imagenAmpliada = ref(null);
const showDeleteModal = ref(false);
let pendingDeleteAction = null;

const atras = () => {
    router.push('/dashboard');
};

const openImage = (url) => {
    imagenAmpliada.value = url;
};

const editarCoche = () => {
    router.push(`/dashboard/${route.params.id}/edit`);
};

const eliminarCoche = () => {
    showDeleteModal.value = true;
    pendingDeleteAction = async () => {
        try {
            await del(`/coches/${route.params.id}`);
            await refreshCars();
            router.push('/dashboard');
        } catch (error) {
            console.error('Error al eliminar el coche:', error);
            alert('Error al eliminar el coche');
        }
    };
};

const confirmDelete = async () => {
    showDeleteModal.value = false;
    if (pendingDeleteAction) await pendingDeleteAction();
};

const cancelDelete = () => {
    showDeleteModal.value = false;
    pendingDeleteAction = null;
};

onMounted(async () => {
    try {
        car.value = await get(`/coches/${route.params.id}`);
    } catch (error) {
        console.error('Error al cargar los detalles del coche:', error);
        alert('Error al cargar los detalles del coche');
    }
});
</script>

<style scoped>
/* Eliminar estilos del slider */
</style>