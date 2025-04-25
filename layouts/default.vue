<template>
    <div class="w-full h-16 flex items-center justify-between px-4 shadow-md shadow-neutral-200">
        <img src="/images/logo.png" alt="Logo de la aplicacion" class="relative top-[9px] w-32" />
        <img @click="logOut" src="/svg/logout.svg" alt="svg para cerrar sesión"
            class="w-7 cursor-pointer hover:scale-105 transition-all duration-500" />
    </div>
    <slot />
</template>
<script setup>
const { logout } = useAuth();

const logOut = () => {
    logout();
}
</script>