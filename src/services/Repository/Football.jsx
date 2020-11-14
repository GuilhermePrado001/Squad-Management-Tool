import api from "../api.jsx";

export const GetLineUp = async (name = null) => {
    if (name === null) return [];

    try {
        // const { data } = await api.get(`/v2/players/search/${name}`);
        const { data } = await api.get();
        return data;
    }
    catch {
        return [];
    }
}