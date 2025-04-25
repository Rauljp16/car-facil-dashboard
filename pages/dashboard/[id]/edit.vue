<template>
    <div>
        <h1>Editar coche</h1>
        <form @submit.prevent="editCar">
            <input v-model="name" required />
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script setup>

// const route = useRoute();
// const router = useRouter();
const name = ref('');
// const { getToken } = useAuth();

// onMounted(async () => {
//     const res = await fetch(`https://api.example.com/cars/${route.params.id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` }
//     });
//     const data = await res.json();
//     name.value = data.name;
// });

// const editCar = async () => {
//     await fetch(`https://api.example.com/cars/${route.params.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${getToken()}`
//         },
//         body: JSON.stringify({ name: name.value })
//     });
//     router.push('/dashboard');
// };
</script>