<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAuthor } from "../services/authorService";

const route = useRoute();

const author = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const idParam = route.params.id;
    const idAsString = Array.isArray(idParam) ? idParam[0] : idParam;
    const authorId = BigInt(idAsString);

    author.value = await getAuthor(authorId);

    console.debug(author.value.title);
    error.value = null;
  } 
  catch (err) {
    error.value = err.message;
    author.value = null;
  }
});
</script>

<template>
  <div v-if="error" id="error" style="color:red">{{ error }}</div>

  <div v-else-if="author">
    <p>ID: {{ author.authorId.toString() }}</p>
    <p>Name: {{ author.firstName }} {{ author.lastName }}</p>
    <p>Biography: {{ author.biography }}</p>
    <p>Date of birth: {{ author.dateOfBirth }}</p>
    <p>Book Count: {{ author.bookCount }}</p>
    <p>{{author.isAvailable ? 'Is active' : 'Is not active' }}</p>
  </div>
</template>
