const useFetch = () => {
    const fetchData = async (endpoint, method, body, requiresAuth = false) => {
        const headers = {
            "Content-Type": "application/json",
        };

        if (requiresAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                headers.authorization = "Bearer " + token;
            }
        }

        const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        const data = await res.json();

        if (!res.ok) {
            return { ok: false, msg: data.message || "Request failed" };
        }

        return { ok: true, msg: data.message, data };
    };

    return fetchData;
};

export default useFetch;
