import api from "../api.jsx";

export const GetLineUp = async (name = null) => {
    if (name === null) return [];

    try {
        const { data } = await api.get(`/players/search/${name}`);
        // const { data } = await api.get();
        return data;
    }
    catch {
        return [];
    }
}