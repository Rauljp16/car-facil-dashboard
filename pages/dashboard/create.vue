<template>
    <section class="w-full min-h-screen bg-neutral-100 p-4">
        <div class="w-full flex flex-col gap-1 bg-white p-4">
            <div class="relative w-full">
                <h1 class="text-2xl font-semibold text-center py-2 w-full">
                    Añadir coche nuevo
                </h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 h-5 cursor-pointer" />
            </div>
            <form @submit.prevent="createCar" class="flex flex-col gap-4 items-center w-full">
                <!-- Inputs grandes (marca y modelo) -->
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Marca</label>
                    <input v-model="marca" type="text" placeholder="Marca..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" required />
                </div>
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Modelo</label>
                    <input v-model="modelo" type="text" placeholder="Modelo..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" required />
                </div>

                <!-- Precio (input grande) -->
                <div class="w-full">
                    <label class="block mb-1 text-sm pl-1 w-full">Precio</label>
                    <input v-model="precio" type="text" placeholder="Precio..."
                        class="w-full h-10 p-2 rounded border border-neutral-300" required />
                </div>

                <!-- Grid de dos columnas para inputs pequeños -->
                <div class="grid grid-cols-2 gap-4 w-full">
                    <!-- Motor y CV -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Motor</label>
                        <input v-model.number="motor" type="number" placeholder="Motor..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" required />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">CV</label>
                        <input v-model.number="cv" type="number" placeholder="CV..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" required />
                    </div>

                    <!-- KM y Año -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">KM</label>
                        <input v-model.number="km" type="number" placeholder="KM..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" required />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Año</label>
                        <input v-model.number="anio" type="number" placeholder="Año..."
                            class="w-full h-10 p-2 rounded border border-neutral-300" required />
                    </div>

                    <!-- Combustible y Cambio -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Combustible</label>
                        <div class="select-container">
                            <select v-model="Combustible" class="w-full h-10 p-2 rounded border border-neutral-300"
                                required>
                                <option disabled value="">combustible</option>
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
                            <select v-model="Cambio" class="w-full h-10 p-2 rounded border border-neutral-300" required>
                                <option disabled value="">cambio</option>
                                <option value="Manual">Manual</option>
                                <option value="Automático">Automático</option>
                            </select>
                        </div>
                    </div>

                    <!-- Puertas y Plazas -->
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Puertas</label>
                        <div class="select-container">
                            <select v-model="puertas" class="w-full h-10 p-2 rounded border border-neutral-300"
                                required>
                                <option disabled value="">puertas</option>
                                <option v-for="n in 9" :key="n" :value="n + 1">{{ n + 1 }}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1 w-full">Plazas</label>
                        <div class="select-container">
                            <select v-model="plazas" class="w-full h-10 p-2 rounded border border-neutral-300" required>
                                <option disabled value="">plazas</option>
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
                            class="hidden" />
                        <button type="button" @click="triggerFileInput"
                            class="w-full h-full p-2 rounded border border-blue-500 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer">
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
                        class="w-24 h-24 rounded overflow-hidden border border-neutral-300 relative group">
                        <img :src="url" class="w-full h-full object-cover" />
                        <div @click.stop="deleteImage(index)"
                            class="absolute h-5 w-5 bg-white/90 rounded top-1 right-1 z-20 hover:bg-white transition-colors cursor-pointer">
                            <img src="/public/svg/delete.svg" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <button type="submit" class="w-2/3 h-10 bg-blue-500 rounded py-2 text-white" :disabled="isSaving">
                    {{ isSaving ? 'Creando coche...' : 'Crear' }}
                </button>
            </form>
        </div>
    </section>

    <!-- Modal para errores -->
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
const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value.click()
}

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
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 16px center;
        background-size: 1em;
        padding-right: 3em;
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
