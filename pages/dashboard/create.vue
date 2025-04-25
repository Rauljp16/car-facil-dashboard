<template>
    <section class="w-full h-screen bg-neutral-100 p-4">
        <div class="w-full flex flex-col gap-4 bg-white p-4 ">
            <div class="relative">
                <h1 class="text-2xl font-semibold text-center py-2">Añadir coche nuevo</h1>
                <img src="/svg/back.svg" @click="atras" class="absolute top-0 right-0 w-5 cursor-pointer" />
            </div>
            <form @submit.prevent="createCar" class="flex flex-col gap-4 items-center">
                <div class="flex w-full items-center justify-between gap-4">
                    <div>
                        <label class="block mb-1 text-sm pl-1">Marca</label>
                        <input v-model="marca" type="text" placeholder="Marca..."
                            class="w-full p-2 rounded border border-neutral-300" required />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1">Modelo</label>
                        <input v-model="modelo" type="text" placeholder="Modelo..."
                            class="w-full p-2 rounded border border-neutral-300" required />
                    </div>
                </div>
                <div class="flex w-full items-center justify-between gap-4">
                    <div>
                        <label class="block mb-1 text-sm pl-1">Año</label>
                        <input v-model.number="anio" type="number" placeholder="Año..."
                            class="w-full p-2 rounded border border-neutral-300" required />
                    </div>
                    <div>
                        <label class="block mb-1 text-sm pl-1">Precio</label>
                        <input v-model.number="precio" type="number" placeholder="Precio..."
                            class="w-full p-2 rounded border border-neutral-300" required />
                    </div>
                </div>
                <button type="submit" class="w-2/3 bg-green-500 rounded py-2 text-white">Crear</button>
            </form>
        </div>
    </section>
</template>

<script setup>

const name = ref('');
// const { getToken } = useAuth();
// const router = useRouter();

const atras = () => {
    navigateTo("/dashboard");
}

// const createCar = async () => {
//     await fetch('https://api.example.com/cars', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${getToken()}`
//         },
//         body: JSON.stringify({ name: name.value })
//     });
//     router.push('/dashboard');
// };
</script>