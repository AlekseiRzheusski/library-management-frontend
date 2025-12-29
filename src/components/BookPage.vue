<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBook } from "../services/bookService";
import { useAuthStore } from "../stores/auth";
import { BorrowBook } from "../services/borrowingService";

const route = useRoute();
const auth = useAuthStore();

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

const handleBorrow = async () => {
  const result = confirm(`Do you want to borrow ${book.value.title}?`);
  if (result) {
    try{
      console.log("Confirmed");
      //TODO: remove days to return hardcode.
      const result = await BorrowBook(book.value.bookId, 12);
      console.log(result);
      alert(`borrowing ${result.borrowingId} was successfully created`);
      location.reload();
    }
    catch(err){
      console.error(err);
      alert(err);
    }
  }
}
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
    <p>{{ book.isAvailable ? 'Is available' : 'Is not available' }}</p>
    <br>
    <div v-if="auth.isAuthenticated && book.isAvailable">
      <button @click="handleBorrow">Borrow</button>
    </div>
  </div>
</template>
