import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',
    {
        state: () => ({
            accessToken: localStorage.getItem('accessToken')
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
                localStorage.setItem("accessToken", token);
            },
            logout() {
                this.accessToken = null;
                localStorage.removeItem("accessToken");
            }
        }
    }
)
