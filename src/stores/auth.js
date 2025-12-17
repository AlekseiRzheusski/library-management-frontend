import { defineStore } from "pinia";

//TODO: use local storage somehow
export const useAuthStore = defineStore('auth',
    {
        state: () => ({
            accessToken: null,
        }),
        getters: {
            isAuthenticated: state => !!state.accessToken,
            userName: state => {
                if (!state.accessToken) return null;

                const payload = JSON.parse(atob(state.accessToken.split('.')[1]));
                console.log(payload);
                return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            }
        },
        actions: {
            setAccessToken(token) {
                this.accessToken = token;
            },
            logout() {
                this.accessToken = null;
            }
        }
    }
)
