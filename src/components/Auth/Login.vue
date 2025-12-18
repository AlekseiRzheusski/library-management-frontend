<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { login } from '../../services/authService';

const username = ref('');
const password = ref('');

const error = ref(null);

const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
    error.value = null;

    try {
        const res = await login(username.value, password.value);
        auth.setAccessToken(res.accessToken);
        await router.push('/books');
    }
    catch (err) {
        console.error(err);
        error.value = err.message;
    }
}
</script>

<template>
  <div class="login-container">
    <h2>Log in</h2>
    <form @submit.prevent="submit">
      <div class="field">
        <label>username</label>
        <input v-model="username" type="text" required />
      </div>
      <div class="field">
        <label>password</label>
        <input v-model="password" type="password" required />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button>Send</button>
    </form>
  </div>
</template>
