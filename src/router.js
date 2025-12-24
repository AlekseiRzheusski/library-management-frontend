import { createRouter, createWebHistory } from "vue-router";
import BookPage from "./components/BookPage.vue";
import BooksSearchPage from "./components/BooksSearchPage.vue";
import AuthorPage from "./components/AuthorPage.vue";
import Login from "./components/Auth/Login.vue";
import UserBorrowingsPage from "./components/UserBorrowingsPage.vue";

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
    },
    {
      path: "/user-borrowings",
      name: "user-borrowings",
      component: UserBorrowingsPage,
    },
    {
      path: "/author/:id",
      name: "author",
      component: AuthorPage,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
