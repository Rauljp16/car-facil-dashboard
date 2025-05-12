<template>
    <section class="w-full h-screen bg-neutral-100 p-4">
        <div class="w-full flex flex-col gap-4 bg-white p-4">
            <div class="relative">
                <h1 class="text-2xl font-semibold text-center py-2">
                    Añadir coche nuevo
                </h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 cursor-pointer" />
            </div>
            <form @submit.prevent="createCar" class="flex flex-col gap-4 items-center">
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Marca</label>
                    <input v-model="marca" type="text" placeholder="Marca..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Modelo</label>
                    <input v-model="modelo" type="text" placeholder="Modelo..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Combustible</label>
                    <select v-model="Combustible" class="w-full p-2 rounded border border-neutral-300" required>
                        <option disabled value="">Selecciona combustible</option>
                        <option value="Diésel">Diésel</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Eléctrico">Eléctrico</option>
                    </select>
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Cambio</label>
                    <select v-model="Cambio" class="w-full p-2 rounded border border-neutral-300" required>
                        <option disabled value="">Selecciona Cambio</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>
                </div>

                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Año</label>
                    <input v-model.number="anio" type="number" placeholder="Año..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">CV</label>
                    <input v-model.number="cv" type="number" placeholder="CV..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Precio</label>
                    <input v-model.number="precio" type="number" placeholder="Precio..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Puertas</label>
                    <input v-model.number="puertas" type="number" placeholder="Puertas..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Motor</label>
                    <input v-model.number="motor" type="number" placeholder="Motor..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Plazas</label>
                    <input v-model.number="plazas" type="number" placeholder="Plazas..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">KM</label>
                    <input v-model.number="km" type="number" placeholder="KM..."
                        class="w-full p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1">Imágenes</label>
                    <div class="relative">
                        <input type="file" accept="image/*" multiple @change="uploadToCloudinary"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            style="font-size:200px;" />
                        <button type="button" @click="$refs.fileInput.click()"
                            class="w-full p-2 rounded border border-blue-500 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer relative z-0">
                            {{ isUploading ? 'Subiendo imágenes...' : 'Seleccionar imágenes' }}
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

                <button type="submit" class="w-2/3 bg-green-500 rounded py-2 text-white" :disabled="isSaving">
                    {{ isSaving ? 'Creando coche...' : 'Crear' }}
                </button>
            </form>
        </div>
    </section>

    <!-- Modal para errores -->
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

    <!-- Overlay de carga -->
    <div v-if="isUploading || isSaving"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-lg text-neutral-800 font-semibold">
                {{ isUploading ? 'Subiendo imágenes...' : 'Creando coche...' }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '../../composables/useApi'
import { useCars } from '../../composables/useCars'
const { cloudinaryUrl, cloudinaryUploadPreset, cloudinaryCloudName } = useRuntimeConfig().public;

const { post } = useApi()
const { refreshCars } = useCars()

const marca = ref('')
const modelo = ref('')
const Combustible = ref('')
const Cambio = ref('')
const anio = ref('')
const cv = ref('')
const precio = ref('')
const puertas = ref('')
const motor = ref('')
const plazas = ref('')
const km = ref('')
const images = ref([])
const isUploading = ref(false)
const isSaving = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')

const atras = () => {
    navigateTo('/dashboard')
}

// SUBIR IMÁGENES A CLOUDINARY
const uploadToCloudinary = async (event) => {
    const files = Array.from(event.target.files)
    isUploading.value = true

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
            )
            const data = await response.json()
            images.value.push(data.secure_url)
        }
    } catch (error) {
        errorMessage.value = 'Error al subir imagen'
        showErrorModal.value = true
    } finally {
        isUploading.value = false
    }
}

// FUNCIÓN PARA RESETEAR TODOS LOS CAMPOS
const resetForm = () => {
    marca.value = ''
    modelo.value = ''
    Combustible.value = ''
    Cambio.value = ''
    anio.value = ''
    cv.value = ''
    precio.value = ''
    puertas.value = ''
    motor.value = ''
    plazas.value = ''
    km.value = ''
    images.value = []
}

const deleteImage = (index) => {
    images.value.splice(index, 1)
}

const closeErrorModal = () => {
    showErrorModal.value = false
    errorMessage.value = ''
}

// ENVÍO DE DATOS DEL FORMULARIO
const createCar = async () => {
    const carData = {
        marca: marca.value,
        modelo: modelo.value,
        combustible: Combustible.value,
        cambio: Cambio.value,
        anio: anio.value,
        cv: cv.value,
        precio: precio.value,
        puertas: puertas.value,
        motor: motor.value,
        plazas: plazas.value,
        km: km.value,
        images: images.value,
    }

    isSaving.value = true
    try {
        await post('/coches', carData)
        resetForm()
        await refreshCars()
        navigateTo('/dashboard')
    } catch (error) {
        errorMessage.value = 'Error al crear coche'
        showErrorModal.value = true
    } finally {
        isSaving.value = false
    }
}
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
</style>
