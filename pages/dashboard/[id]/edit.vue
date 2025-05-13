<template>
    <section class="w-full min-h-screen bg-neutral-100 p-4">
        <div class="w-full flex flex-col gap-1 bg-white p-4">
            <div class="relative w-full">
                <h1 class="text-2xl font-semibold text-center py-2 w-full">
                    Editar coche
                </h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 h-5 cursor-pointer" />
            </div>
            <form @submit.prevent="editCar" class="flex flex-col gap-4 items-center w-full">
                <!-- Inputs grandes (marca y modelo) -->
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Marca</label>
                    <input v-model="marca" type="text" placeholder="Marca..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Modelo</label>
                    <input v-model="modelo" type="text" placeholder="Modelo..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" />
                </div>

                <!-- Precio (input grande) -->
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Precio</label>
                    <input v-model="precio" type="text" placeholder="Precio..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" />
                </div>

                <!-- Grid de dos columnas para inputs pequeños -->
                <div class="grid grid-cols-2 gap-4 w-full">
                    <!-- Motor y CV -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Motor</label>
                        <input v-model.number="motor" type="number" placeholder="Motor..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">CV</label>
                        <input v-model.number="cv" type="number" placeholder="CV..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" />
                    </div>

                    <!-- KM y Año -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">KM</label>
                        <input v-model.number="km" type="number" placeholder="KM..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Año</label>
                        <input v-model.number="anio" type="number" placeholder="Año..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" />
                    </div>

                    <!-- Combustible y Cambio -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Combustible</label>
                        <div class="select-container">
                            <select v-model="combustible" class="w-full h-10 p-2 rounded border border-neutral-300">
                                <option value="Diésel">Diésel</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Eléctrico">Eléctrico</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Cambio</label>
                        <div class="select-container">
                            <select v-model="cambio" class="w-full h-10 p-2 rounded border border-neutral-300">
                                <option value="Manual">Manual</option>
                                <option value="Automático">Automático</option>
                            </select>
                        </div>
                    </div>

                    <!-- Puertas y Plazas -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Puertas</label>
                        <div class="select-container">
                            <select v-model="puertas" class="w-full h-10 p-2 rounded border border-neutral-300">
                                <option v-for="n in 9" :key="n" :value="n + 1">{{ n + 1 }}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Plazas</label>
                        <div class="select-container">
                            <select v-model="plazas" class="w-full h-10 p-2 rounded border border-neutral-300">
                                <option v-for="n in 9" :key="n" :value="n + 1">{{ n + 1 }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Imágenes -->
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Imágenes</label>
                    <div class="relative w-full h-10">
                        <input ref="fileInput" type="file" accept="image/*" multiple @change="uploadToCloudinary"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            style="font-size:200px;" />
                        <button type="button" @click="triggerFileInput"
                            class="w-full h-full p-2 rounded border border-blue-500 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer relative z-0">
                            {{ isUploading ? 'Subiendo imágenes...' : 'Seleccionar imágenes' }}
                        </button>
                    </div>
                    <div v-if="images.length > 0" class="text-xs text-neutral-500 mt-1 w-full">
                        {{ images.length }} imagen{{ images.length === 1 ? '' : 'es' }} seleccionada{{ images.length ===
                            1 ? '' : 's' }}
                    </div>
                </div>

                <!-- Vista previa -->
                <div class="flex flex-wrap gap-2 mt-4 w-full justify-center">
                    <div v-for="(url, index) in images" :key="index"
                        class="w-24 h-24 rounded overflow-hidden border border-neutral-300 relative">
                        <img :src="url" class="w-full h-full object-cover" />
                        <div @click="deleteImage(index)" class="absolute h-5 w-5 bg-white/90 rounded top-1 right-1">
                            <img src="/public/svg/delete.svg" class="w-full h-full object-cover cursor-pointer" />
                        </div>
                    </div>
                </div>

                <button type="submit" class="w-2/3 h-10 bg-blue-500 rounded py-2 text-white" :disabled="isSaving">
                    {{ isSaving ? 'Guardando cambios...' : 'Guardar cambios' }}
                </button>
            </form>
        </div>
    </section>
    <!-- Modal para confirmar guardar sin cambios -->
    <div v-if="showNoChangesModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <p class="mb-6 text-lg text-neutral-800 font-semibold w-full">No has realizado ningún cambio.<br>¿Deseas
                guardar
                igualmente?</p>
            <div class="flex gap-4 justify-center w-full">
                <button @click="confirmNoChanges"
                    class="px-4 py-2 h-10 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sí,
                    guardar</button>
                <button @click="cancelNoChanges"
                    class="px-4 py-2 h-10 rounded bg-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-300 transition">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- Modal para errores de validación -->
    <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <p class="mb-6 text-lg text-neutral-800 font-semibold w-full">{{ errorMessage }}</p>
            <div class="flex justify-center w-full">
                <button @click="closeErrorModal"
                    class="px-4 py-2 h-10 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Aceptar
                </button>
            </div>
        </div>
    </div>

    <!-- Overlay de carga -->
    <div v-if="isUploading || isSaving"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-lg text-neutral-800 font-semibold w-full">
                {{ isUploading ? 'Subiendo imágenes...' : 'Guardando cambios...' }}
            </p>
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
const isUploading = ref(false);
const isSaving = ref(false);

const atras = () => {
    router.push('/dashboard');
};

const uploadToCloudinary = async (event) => {
    const files = Array.from(event.target.files);
    isUploading.value = true;
    try {
        for (const file of files) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', cloudinaryUploadPreset)
            const response = await fetch(
                cloudinaryUrl,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const data = await response.json();
            images.value.push(data.secure_url);
        }
    } catch (error) {
        errorMessage.value = 'Error al subir imagen';
        showErrorModal.value = true;
    } finally {
        isUploading.value = false;
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
    for (const key of Object.keys(a)) {
        if (key === 'images') {
            if (a.images.length !== b.images.length) return false;
            for (let i = 0; i < a.images.length; i++) {
                if (a.images[i] !== b.images[i]) return false;
            }
        } else if (key === 'precio') {
            const precioA = Number(a.precio.toString().replace('.', ''));
            const precioB = Number(b.precio.toString().replace('.', ''));
            if (precioA !== precioB) return false;
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
        precio: precio.value,
        puertas: Number(puertas.value),
        motor: Number(motor.value),
        plazas: Number(plazas.value),
        km: Number(km.value),
        images: images.value,
    };

    if (isEqual(carData, originalCar.value)) {
        showNoChangesModal.value = true;
        return;
    }

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

    if (images.value.length === 0) {
        errorMessage.value = 'Debes seleccionar al menos una imagen';
        showErrorModal.value = true;
        return;
    }

    isSaving.value = true;
    try {
        await put(`/coches/${route.params.id}`, {
            ...carData,
            precio: carData.precio.replace('.', '')
        });
        await refreshCars();
        router.push('/dashboard');
    } catch (error) {
        errorMessage.value = 'Error al editar coche';
        showErrorModal.value = true;
    } finally {
        isSaving.value = false;
    }
};

const confirmNoChanges = () => {
    showNoChangesModal.value = false;
    router.push('/dashboard');
};

const cancelNoChanges = () => {
    showNoChangesModal.value = false;
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

/* Asegurar que los botones de submit no hereden estilos del input file */
button[type="submit"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    min-height: 40px;
}

/* Asegurar que el input file no afecte a otros elementos */
input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
}

/* Asegurar que los inputs y selects tengan altura consistente */
input,
select {
    min-height: 40px;
    box-sizing: border-box;
}

/* Asegurar que los botones tengan altura consistente */
button {
    min-height: 40px;
    box-sizing: border-box;
}

/* Estilos para los select */
.select-container {
    position: relative;
    width: 100%;
}

select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;
    color: #374151;
}

select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* Estilos específicos para Safari */
@supports (-webkit-touch-callout: none) {

    /* Estilo del select principal */
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 1em;
        padding-right: 2.5em;
    }

    /* Estilo del menú desplegable */
    select:focus {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 400px;
    }

    /* Estilo de las opciones del menú */
    select option {
        padding: 12px;
        background-color: white;
        color: #374151;
        text-align: left;
    }
}

/* Estilos para las opciones del select */
select option {
    padding: 8px 12px;
    background-color: white;
    color: #374151;
}

/* Asegurar que el contenedor del select tenga posición relativa */
.select-container {
    position: relative;
    width: 100%;
}
</style>