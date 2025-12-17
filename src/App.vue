<script setup>
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';
import api from './axiosClient';
import { logout } from './services/authService';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const res = await api.post('/auth/refresh');
    auth.setAccessToken(res.data.accessToken);
  } catch {
    auth.logout();
  }
});

const handleLogout = async () => {
  try {
    await logout()
  } catch (err) {
    console.error(err)
  } finally {
    const auth = useAuthStore()
    auth.logout()
  }
}

const handleLogin = async () => {
  await router.push({name: "login"});
}

</script>
<template>
  <div>
      <router-link :to="`/books`">
        Books List 
      </router-link>
    <p v-if="auth.isAuthenticated">Hi {{ auth.userName }}
      <button @click="handleLogout">logout</button>
    </p>
    <p v-else>
      <button @click="handleLogin">login</button>
    </p>
  </div>
  <router-view />
</template>
