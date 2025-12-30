<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { getUserBorrowings } from "../services/borrowingService";
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const borrowings = ref([]);
const error = ref(null);

const status = ref(route.query.status || "Active");
const pageNumber = ref(Number(route.query.pageNumber) || 1);
const pageSize = ref(Number(route.query.pageSize) || 6);

var showLeftButton = ref(false);
var showRightButton = ref(false);

async function loadPage() {
    try {
        error.value = null;
        const res = await getUserBorrowings(
            {
                status: status.value,
                pageNumber: pageNumber.value,
                pageSize: pageSize.value
            });

        borrowings.value = res.borrowings;
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
        status.value = route.query.status || "Active";
        pageNumber.value = Number(newQuery.pageNumber) || 1;
        pageSize.value = Number(newQuery.pageSize) || 6;
        loadPage();
    },
    { immediate: true }
);

const handleLoadClick = async () => {
    router.push({
        name: 'user-borrowings',
        query: {
            status: status.value,
            pageNumber: 1,
            pageSize: pageSize.value
        }
    });
};

const handleNextClick = async () => {
    pageNumber.value++;
    router.push({
        name: 'user-borrowings',
        query: {
            status: status.value,
            pageNumber: pageNumber.value,
            pageSize: pageSize.value
        }
    });
};

const handlePrevClick = async () => {
    pageNumber.value--;
    router.push({
        name: 'user-borrowings',
        query: {
            status: status.value,
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
        <br>
        <label>
            Status:
            <select id="status" v-model="status">
                <option value="Active">Active</option>
                <option value="Returned">Returned</option>
                <option value="Overdue">Overdue</option>
            </select>
        </label>
        <br>
        <button @click="handleLoadClick">Load</button>
    </div>
    <br></br>
    <div v-if="error" style="color:red">{{ error }}</div>
    <template v-else>
        <table>
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Borrow Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="borrowing in borrowings" :key="borrowing.borrowingId">
                    <td>{{ borrowing.bookTitle }}</td>
                    <td>{{ borrowing.borrowDate }}</td>
                    <td>{{ borrowing.dueDate }}</td>
                    <td>{{ borrowing.status }}</td>
                </tr>
            </tbody>
        </table>
        <br></br>
        <button v-if="showLeftButton" @click="handlePrevClick">Prev</button>
        <button v-if="showRightButton" @click="handleNextClick">Next</button>
    </template>


</template>
