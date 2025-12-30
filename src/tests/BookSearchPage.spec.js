import { mount } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, vi } from "vitest";
import BooksSearchPage from "../components/BooksSearchPage.vue";
import BookPage from "../components/BookPage.vue";
import AuthorPage from "../components/AuthorPage.vue";
import * as bookService from "../services/bookService";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/books", component: BooksSearchPage, name: "books" },
        { path: "/author/:id", component: AuthorPage, name: "author" },
        { path: "/book/:id", component: BookPage, name: "book" }
    ],
});

const books = [
    {
        bookId: 1n,
        title: "Exercises and Problems in Mathematical Analysis",
        isbn: "9785507508853",
        description: "Exercises and Problems in Mathematical Analysis",
        authorId: 3n,
        authorName: "Boris Demidovich",
        categoryId: 3n,
        categoryName: "Math",
        publishedDate: "2017-03-12",
        pageCount: 625,
        isAvailable: false
    },
    {
        bookId: 2n,
        title: "Structured computer architecture",
        isbn: "9780131859401",
        description: "Structured Computer Organization, specifically written for undergraduate students, is a best-selling guide that provides an accessible introduction to computer hardware and architecture. This text will also serve as a useful resource for all computer professionals and engineers who need an overview or introduction to computer architecture.",
        authorId: "2",
        authorName: "Andrew Tanenbaum",
        categoryId: "4",
        categoryName: "Programming",
        publishedDate: "2012-07-25",
        pageCount: 808,
        isAvailable: false
    }];

describe("BookSearchPage.vue", () => {
    it("shows table and navigation buttons", async () => {
        vi.spyOn(bookService, 'getBooksPage').mockResolvedValue({
            books: books,
            totalCount: 10,
            numberOfPages: 5,
            pageNumber: 2,
            pageSize: 2
        });

        router.push({ name: 'books', query: { pageNumber: '2', pageSize: '2' } });
        await router.isReady();

        const wrapper = mount(BooksSearchPage, { global: { plugins: [router] } });

        await flushPromises();

        expect(wrapper.text()).toContain("Exercises and Problems in Mathematical Analysis");
        expect(wrapper.text()).toContain("Structured computer architecture");

        expect(wrapper.find('table').exists()).toBe(true);
        expect(wrapper.vm.showLeftButton).toBe(true);
        expect(wrapper.vm.showRightButton).toBe(true);

        expect(wrapper.find('#btn-prev').exists()).toBe(true);
        expect(wrapper.find('#btn-next').exists()).toBe(true);
    });

    it("first page should show only next button", async () => {
        vi.spyOn(bookService, 'getBooksPage').mockResolvedValue({
            books: books,
            totalCount: 10,
            numberOfPages: 5,
            pageNumber: 1,
            pageSize: 2
        });

        router.push({ name: 'books', query: { pageNumber: '1', pageSize: '2' } });
        await router.isReady();

        const wrapper = mount(BooksSearchPage, { global: { plugins: [router] } });

        await flushPromises();

        expect(wrapper.find('#btn-prev').exists()).toBe(false);
        expect(wrapper.find('#btn-next').exists()).toBe(true);
    });

    it("last page should show only prev button", async () => {
        vi.spyOn(bookService, 'getBooksPage').mockResolvedValue({
            books: books,
            totalCount: 10,
            numberOfPages: 5,
            pageNumber: 5,
            pageSize: 2
        });

        router.push({ name: 'books', query: { pageNumber: '5', pageSize: '2' } });
        await router.isReady();

        const wrapper = mount(BooksSearchPage, { global: { plugins: [router] } });

        await flushPromises();

        expect(wrapper.find('#btn-prev').exists()).toBe(true);
        expect(wrapper.find('#btn-next').exists()).toBe(false);
    });
});
