<template>
    <div class="p-4 pt-0 w-full min-h-screen bg-neutral-100">
        <h1 class="text-2xl py-4 pb-0 font-semibold">Lista de coches</h1>

        <div class="w-full pt-4 pb-6 flex items-center justify-between">
            <input type="text" v-model="filtro" placeholder="Marca o modelo"
                class="w-1/2 max-w-80 border border-neutral-400 rounded p-2" />
            <button @click="crearCoche"
                class="font-bold shadow-sm p-2 shadow-neutral-500 rounded bg-green-600 border border-green-600 text-white">
                + Añadir coche
            </button>
        </div>

        <section class="flex flex-col gap-4">
            <article v-for="coche in cochesFiltrados" :key="coche.id"
                class="flex w-full h-24 bg-white items-center gap-2 my-0 p-2 rounded shadow-sm shadow-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors"
                @click="verDetalles(coche.id)">
                <div class="w-1/3 h-full" @click.stop>
                    <img :src="coche.images[0]" alt="Imagen del coche"
                        class="w-full h-full object-cover rounded cursor-pointer" @click="openImage(coche.images[0])" />
                </div>
                <div class="w-full h-full flex flex-col justify-between pb-2">
                    <div class="flex items-center justify-between">
                        <p class="font-semibold text-green-600">{{ coche.marca }} {{ coche.modelo }}</p>
                        <p class="text-red-500 min-w-fit mb-auto">{{ coche.precio }} €</p>
                    </div>
                    <div class="w-full flex justify-between">
                        <div class="flex gap-[2px]">
                            <img src="/svg/calendar.svg" alt="svg de calendario" class="w-4" />
                            <p>{{ coche.anio }}</p>
                        </div>
                        <div class="flex gap-[2px]">
                            <img src="/svg/kmBlack.svg" alt="svg de calendario" class="w-4" />
                            <p>{{ coche.km.toLocaleString() }}</p>
                        </div>
                        <div class="flex gap-[2px]">
                            <img src="/svg/bolt.svg" alt="svg de calendario" class="w-4" />
                            <p>{{ formatNumber.format(Number(coche.motor)) }}</p>
                        </div>
                    </div>
                </div>
            </article>
        </section>

        <div v-if="imagenAmpliada"
            class="fixed inset-0 p-2 bg-black bg-opacity-80 flex items-center justify-center z-50"
            @click="imagenAmpliada = null">
            <img :src="imagenAmpliada" class="max-w-full max-h-full rounded shadow-lg" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCars } from '~/composables/useCars';

const { cars, loadCars } = useCars();
const filtro = ref("");
const imagenAmpliada = ref(null);
const formatNumber = new Intl.NumberFormat("es-ES", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const cochesFiltrados = computed(() =>
    cars.value.filter(coche =>
        `${coche.marca} ${coche.modelo}`.toLowerCase().includes(filtro.value.toLowerCase())
    )
);

const crearCoche = () => {
    navigateTo("/dashboard/create")
}

const verDetalles = (id) => {
    navigateTo(`/dashboard/${id}`);
}

const openImage = (url) => {
    imagenAmpliada.value = url;
};

onMounted(() => {
    loadCars();
});
</script>