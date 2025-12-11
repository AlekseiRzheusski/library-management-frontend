<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBook } from "../services/bookService";

const route = useRoute();

const book = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const idParam = route.params.id;
    const idAsString = Array.isArray(idParam) ? idParam[0] : idParam;
    const bookId = BigInt(idAsString);

    book.value = await getBook(bookId);

    console.debug(book.value.title);
    error.value = null;
  } 
  catch (err) {
    console.error(err);
    error.value = err.message;
    book.value = null;
  }
});
</script>

<template>
  <div v-if="error" style="color:red">{{ error }}</div>

  <div v-else-if="book">
    <p>ID: {{ book.bookId.toString() }}</p>
    <p>Title: {{ book.title }}</p>
    <p>ISBN: {{ book.isbn }}</p>
    <p>Description: {{ book.description }}</p>
    <p>Author full name:
      <router-link :to="`/author/${book.authorId}`">
        {{ book.authorName }}
      </router-link>
      </p>
    <p>Category Name: {{ book.categoryName }}</p>
    <p>Published Date: {{ book.publishedDate }}</p>
    <p>Page Count: {{ book.pageCount }}</p>
    <p>{{book.isAvailable ? 'Is available' : 'Is not available' }}</p>
  </div>
</template>
