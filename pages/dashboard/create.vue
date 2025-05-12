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
                    <input type="file" accept="image/*" multiple @change="uploadToCloudinary"
                        class="w-full p-2 rounded border border-neutral-300 bg-white" />
                </div>

                <!-- Vista previa -->
                <div class="flex flex-wrap gap-2 mt-4 w-full">
                    <div v-for="(url, index) in images" :key="index"
                        class="w-24 h-24 rounded overflow-hidden border border-neutral-300">
                        <img :src="url" class="w-full h-full object-cover" />
                    </div>
                </div>

                <button type="submit" class="w-2/3 bg-green-500 rounded py-2 text-white">
                    Crear
                </button>
            </form>
        </div>
    </section>
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

const atras = () => {
    navigateTo('/dashboard')
}

// SUBIR IMÁGENES A CLOUDINARY
const uploadToCloudinary = async (event) => {
    const files = Array.from(event.target.files)

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
            )
            const data = await response.json()
            images.value.push(data.secure_url)
        } catch (error) {
            console.error('Error al subir imagen:', error)
        }
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

    try {
        await post('/coches', carData)
        resetForm()
        await refreshCars()
        navigateTo('/dashboard')
    } catch (error) {
        console.error('Error al crear coche:', error)
    }
}
</script>
