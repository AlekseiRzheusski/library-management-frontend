import { createRouter, createWebHistory } from "vue-router";
import BookPage from "./components/BookPage.vue";
import BooksSearchPage from "./components/BooksSearchPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/book/:id",
      name: "book",
      component: BookPage,
      props: true
    },
    {
      path: "/books",
      name: "books",
      component: BooksSearchPage,
    }
  ]
});
