const BASE_URL = "http://localhost:5000";
const RESOURSE_URL = `${BASE_URL}/bank`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            }
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

// public functionality

export const getAllBanks = async () => {
    const rawResponse = await baseRequest({ method: "GET" });

    return rawResponse.json();
};

export const postBank = (body) => baseRequest({ method: "POST", body });

export const updateBank = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteBank = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });