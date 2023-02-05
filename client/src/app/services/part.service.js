import httpService from "./http.service";

const partEndpoint = "parts/";

const partService = {
    get: async () => {
        const { data } = await httpService.get(partEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            partEndpoint + payload.id,
            payload
        );
        return data;
    }
};

export default partService;
