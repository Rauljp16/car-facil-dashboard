<template>
    <div class="bg-neutral-100 pt-20 w-full h-screen">
        <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h1 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

            <form @submit.prevent="handleLogin" class="flex flex-col gap-4 items-center">
                <div class="w-full">
                    <label class="block mb-1">Correo electrónico</label>
                    <input v-model="email" type="email"
                        :class="['w-full px-3 py-2 border rounded', error && 'border-red-500',]" required />
                </div>

                <div class="w-full">
                    <label class="block mb-1">Contraseña</label>
                    <input v-model="password" type="password"
                        :class="['w-full px-3 py-2 border rounded', error && 'border-red-500']" required />
                </div>

                <button type="submit" class="w-2/3 bg-red-500 text-white py-2 rounded">
                    Entrar
                </button>
                <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
            </form>
        </div>
    </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const error = ref("");
const { login } = useAuth();

const handleLogin = async () => {
    try {
        error.value = "";
        const success = await login(email.value, password.value);
        if (success) {
            navigateTo("/dashboard");
        }
    } catch (err) {
        error.value = "rellena los campos correctamente";
    }
};
</script>
