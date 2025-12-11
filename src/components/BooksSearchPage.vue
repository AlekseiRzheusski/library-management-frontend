<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { getBooksPage } from "../services/bookService";

const route = useRoute();
const router = useRouter();

const books = ref([]);
const error = ref(null);

const pageNumber = ref(Number(route.query.pageNumber) || 1);
const pageSize = ref(Number(route.query.pageSize) || 6);

var showLeftButton = ref(false);
var showRightButton = ref(false);

async function loadPage() {
    try {
        const res = await getBooksPage(
            {
                pageNumber: pageNumber.value,
                pageSize: pageSize.value
            });

        books.value = res.books;
        showLeftButton.value = false;
        showRightButton.value = false;

        if (res.pageNumber < res.numberOfPages) {
            showRightButton.value = true;
        }
        if (res.pageNumber > 1) {
            showLeftButton.value = true;
        }
    } catch (err) {
        console.error(err);
        error.value = err.message;
    }
}

watch(
    () => route.query,
    (newQuery) => {
        pageNumber.value = Number(newQuery.pageNumber) || 1;
        pageSize.value = Number(newQuery.pageSize) || 6;
        loadPage();
    },
    { immediate: true }
);

const handleLoadClick = async () => {
    router.push({
        name: 'books',
        query: {
            pageNumber: pageNumber.value,
            pageSize: pageSize.value
        }
    });
};

const handleNextClick = async () => {
    pageNumber.value++;
    router.push({
        name: 'books',
        query: {
            pageNumber: pageNumber.value,
            pageSize: pageSize.value
        }
    });
};

const handlePrevClick = async () => {
    pageNumber.value--;
    router.push({
        name: 'books',
        query: {
            pageNumber: pageNumber.value,
            pageSize: pageSize.value
        }
    });
};

</script>

<template>

    <div>
        <label>
            Page Size:
            <input type="number" v-model.number="pageSize" min="1" />
        </label>

        <button @click="handleLoadClick">Load</button>
    </div>
    <br></br>
    <div v-if="error" style="color:red">{{ error }}</div>
    <template v-else>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Published</th>
                    <th>Pages</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.bookId">
                    <td>
                        <router-link :to="`/book/${book.bookId}`">
                            {{ book.title }}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="`/author/${book.authorId}`">
                            {{ book.authorName }}
                        </router-link>
                    </td>
                    <td>{{ book.categoryName }}</td>
                    <td>{{ book.publishedDate }}</td>
                    <td>{{ book.pageCount }}</td>
                    <td>{{ book.isAvailable ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
        <br></br>
        <button v-if="showLeftButton" @click="handlePrevClick">Prev</button>
        <button v-if="showRightButton" @click="handleNextClick">Next</button>
    </template>


</template>
