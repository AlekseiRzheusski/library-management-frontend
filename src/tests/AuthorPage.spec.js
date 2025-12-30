import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, vi } from "vitest";
import AuthorPage from "../components/AuthorPage.vue";
import * as authorService from '../services/authorService'

const router = createRouter({ 
    history: createWebHistory(),
    routes: [{ path: "/author/:id", component: AuthorPage, name: "author" }], 
});

describe('AuthorPage.vue', () => {
    it('shows author data', async () => {
        const spy = vi.spyOn(authorService, 'getAuthor').mockResolvedValue({
            authorId: 5n,
            firstName: "Anton",
            lastName: "Chekhov",
            biography: "Was a Russian playwright and short-story writer, widely considered to be one of the greatest writers of all time.",
            dateOfBirth: "1860-01-29",
            isActive: false,
            bookCount: 1
        });


        router.push("/author/5");
        await router.isReady(); 
        const wrapper = mount(AuthorPage, { global: { plugins: [router], }, });

        await new Promise(resolve => setTimeout(resolve));
        expect(spy).toBeCalled();
        expect(wrapper.text()).toContain('Anton Chekhov');
        expect(wrapper.text()).toContain('Is not active');
    });

    it('shows error in the separate div', async() => {
        vi.spyOn(authorService, 'getAuthor').mockRejectedValue(new Error('Request failed with status code 404'));

        router.push("/author/100");
        await router.isReady(); 
        const wrapper = mount(AuthorPage, { global: { plugins: [router], }, });

        await new Promise(resolve => setTimeout(resolve));
        expect(wrapper.find('#error').text()).toBe('Request failed with status code 404');
    });
});
