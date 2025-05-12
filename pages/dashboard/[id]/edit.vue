<template>
    <section class="w-full min-h-screen bg-neutral-100 p-4">
        <div class="w-full flex flex-col gap-4 bg-white p-4">
            <div class="relative">
                <h1 class="text-2xl font-semibold text-center py-2">
                    Editar coche
                </h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 cursor-pointer" />
            </div>
            <form @submit.prevent="editCar" class="flex flex-col gap-4 items-center">
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Marca</label>
                    <input v-model="marca" type="text" placeholder="Marca..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Modelo</label>
                    <input v-model="modelo" type="text" placeholder="Modelo..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Combustible</label>
                    <select v-model="combustible" class="w-full p-2 rounded border border-neutral-300">
                        <option disabled value="">Selecciona combustible</option>
                        <option value="Diésel">Diésel</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Eléctrico">Eléctrico</option>
                    </select>
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Cambio</label>
                    <select v-model="cambio" class="w-full p-2 rounded border border-neutral-300">
                        <option disabled value="">Selecciona Cambio</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Año</label>
                    <input v-model.number="anio" type="number" placeholder="Año..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">CV</label>
                    <input v-model.number="cv" type="number" placeholder="CV..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Precio</label>
                    <input v-model="precio" type="text" placeholder="Precio..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Puertas</label>
                    <input v-model.number="puertas" type="number" placeholder="Puertas..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Motor</label>
                    <input v-model.number="motor" type="number" placeholder="Motor..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Plazas</label>
                    <input v-model.number="plazas" type="number" placeholder="Plazas..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">KM</label>
                    <input v-model.number="km" type="number" placeholder="KM..."
                        class="w-full p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Imágenes</label>
                    <div class="relative">
                        <input ref="fileInput" type="file" accept="image/*" multiple @change="uploadToCloudinary"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            style="font-size:200px;" />
                        <button type="button" @click="$refs.fileInput.click()"
                            class="w-full p-2 rounded border border-blue-500 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer relative z-0">
                            Seleccionar imágenes
                        </button>
                    </div>
                    <div v-if="images.length > 0" class="text-xs text-neutral-500 mt-1">
                        {{ images.length }} imagen{{ images.length === 1 ? '' : 'es' }} seleccionada{{ images.length ===
                            1 ? '' : 's' }}
                    </div>
                </div>
                <!-- Vista previa -->
                <div class="flex flex-wrap gap-2 mt-4 w-full">
                    <div v-for="(url, index) in images" :key="index"
                        class="w-24 h-24 rounded overflow-hidden border border-neutral-300 relative">
                        <img :src="url" class="w-full h-full object-cover" />
                        <div @click="deleteImage(index)"
                            class="absolute h-4 w-4 p-[1px] bg-white/90 rounded top-1 right-1">
                            <img src="/public/svg/delete.svg" class="w-full h-full object-cover cursor-pointer" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="w-2/3 bg-blue-500 rounded py-2 text-white">
                    Guardar cambios
                </button>
            </form>
        </div>
    </section>
    <!-- Modal para confirmar guardar sin cambios -->
    <div v-if="showNoChangesModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <p class="mb-6 text-lg text-neutral-800 font-semibold">No has realizado ningún cambio.<br>¿Deseas guardar
                igualmente?</p>
            <div class="flex gap-4 justify-center">
                <button @click="confirmNoChanges"
                    class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sí,
                    guardar</button>
                <button @click="cancelNoChanges"
                    class="px-4 py-2 rounded bg-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-300 transition">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- Modal para errores de validación -->
    <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <p class="mb-6 text-lg text-neutral-800 font-semibold">{{ errorMessage }}</p>
            <div class="flex justify-center">
                <button @click="closeErrorModal"
                    class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useCars } from '~/composables/useCars';
const { cloudinaryUrl, cloudinaryUploadPreset, cloudinaryCloudName } = useRuntimeConfig().public;

const route = useRoute();
const router = useRouter();
const { get, put } = useApi();
const { refreshCars } = useCars();

const marca = ref('');
const modelo = ref('');
const combustible = ref('');
const cambio = ref('');
const anio = ref('');
const cv = ref('');
const precio = ref('');
const puertas = ref('');
const motor = ref('');
const plazas = ref('');
const km = ref('');
const images = ref([]);
const originalCar = ref({});
const showNoChangesModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');
let pendingNoChangesAction = null;

const atras = () => {
    router.push('/dashboard');
};

const uploadToCloudinary = async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', cloudinaryUploadPreset)
        try {
            const response = await fetch(
                cloudinaryUrl,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const data = await response.json();
            images.value.push(data.secure_url);
        } catch (error) {
            console.error('Error al subir imagen:', error);
        }
    }
};

onMounted(async () => {
    try {
        const car = await get(`/coches/${route.params.id}`);
        marca.value = car.marca || '';
        modelo.value = car.modelo || '';
        combustible.value = car.combustible || '';
        cambio.value = car.cambio || '';
        anio.value = Number(car.anio) || 0;
        cv.value = Number(car.cv) || 0;
        precio.value = car.precio?.toString() || '';
        puertas.value = Number(car.puertas) || 0;
        motor.value = Number(car.motor) || 0;
        plazas.value = Number(car.plazas) || 0;
        km.value = Number(car.km) || 0;
        images.value = car.images || [];
        // Guardar copia original para comparar
        originalCar.value = {
            marca: car.marca,
            modelo: car.modelo,
            combustible: car.combustible,
            cambio: car.cambio,
            anio: Number(car.anio),
            cv: Number(car.cv),
            precio: car.precio?.toString(),
            puertas: Number(car.puertas),
            motor: Number(car.motor),
            plazas: Number(car.plazas),
            km: Number(car.km),
            images: (car.images || []).slice(),
        };
    } catch (error) {
        console.error('Error al cargar datos del coche:', error);
        alert('Error al cargar datos del coche');
    }
});

const isEqual = (a, b) => {
    // Compara todos los campos excepto imágenes (que es un array)
    for (const key of Object.keys(a)) {
        if (key === 'images') {
            if (a.images.length !== b.images.length) return false;
            for (let i = 0; i < a.images.length; i++) {
                if (a.images[i] !== b.images[i]) return false;
            }
        } else if (key === 'precio') {
            // Para el precio, comparamos los valores como strings
            if (String(a.precio) !== String(b.precio)) return false;
        } else {
            if (a[key] !== b[key]) return false;
        }
    }
    return true;
};

const editCar = async () => {
    const carData = {
        marca: marca.value,
        modelo: modelo.value,
        combustible: combustible.value,
        cambio: cambio.value,
        anio: Number(anio.value),
        cv: Number(cv.value),
        precio: precio.value.replace('.', ''),
        puertas: Number(puertas.value),
        motor: Number(motor.value),
        plazas: Number(plazas.value),
        km: Number(km.value),
        images: images.value,
    };

    // Validación de campos vacíos o cero
    const validaciones = [
        { campo: 'marca', valor: marca.value, tipo: 'texto' },
        { campo: 'modelo', valor: modelo.value, tipo: 'texto' },
        { campo: 'combustible', valor: combustible.value, tipo: 'texto' },
        { campo: 'cambio', valor: cambio.value, tipo: 'texto' },
        { campo: 'año', valor: anio.value, tipo: 'numero' },
        { campo: 'CV', valor: cv.value, tipo: 'numero' },
        { campo: 'precio', valor: precio.value, tipo: 'texto' },
        { campo: 'puertas', valor: puertas.value, tipo: 'numero' },
        { campo: 'motor', valor: motor.value, tipo: 'numero' },
        { campo: 'plazas', valor: plazas.value, tipo: 'numero' },
        { campo: 'KM', valor: km.value, tipo: 'numero' }
    ];

    for (const validacion of validaciones) {
        if (validacion.tipo === 'texto') {
            if (!validacion.valor || validacion.valor.trim() === '') {
                errorMessage.value = `El campo ${validacion.campo} no puede estar vacío`;
                showErrorModal.value = true;
                return;
            }
        } else if (validacion.tipo === 'numero') {
            if (!validacion.valor || validacion.valor <= 0) {
                errorMessage.value = `El campo ${validacion.campo} debe ser mayor que 0`;
                showErrorModal.value = true;
                return;
            }
        }
    }

    // Validación de imágenes
    if (images.value.length === 0) {
        errorMessage.value = 'Debes seleccionar al menos una imagen';
        showErrorModal.value = true;
        return;
    }

    // Si no hay cambios, mostrar modal antes de navegar
    if (isEqual(carData, originalCar.value)) {
        showNoChangesModal.value = true;
        pendingNoChangesAction = () => router.push('/dashboard');
        return;
    }

    try {
        await put(`/coches/${route.params.id}`, carData);
        await refreshCars();
        router.push('/dashboard');
    } catch (error) {
        console.error('Error al editar coche:', error);
        errorMessage.value = 'Error al editar coche';
        showErrorModal.value = true;
    }
};

const confirmNoChanges = () => {
    showNoChangesModal.value = false;
    if (pendingNoChangesAction) pendingNoChangesAction();
};
const cancelNoChanges = () => {
    showNoChangesModal.value = false;
    pendingNoChangesAction = null;
};

const deleteImage = (index) => {
    images.value.splice(index, 1);
};

const closeErrorModal = () => {
    showErrorModal.value = false;
    errorMessage.value = '';
};
</script>

<style scoped>
input[type="file"]::-webkit-file-upload-button {
    visibility: hidden;
}

input[type="file"]::file-selector-button {
    visibility: hidden;
}

input[type="file"] {
    color: transparent;
}
</style>