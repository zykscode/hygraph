import { getToken } from "#/helpers/index";

export const API_HOST = "/api";

interface ResponseError extends Error {
    response: Response;
    json?: any;
    status?: number;
}

const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const authHeader: Record<string, string> = {};

interface ResponseError extends Error {
    response: Response;
    json?: any;
    status?: number;
}

async function handleResponse(
    p_response: Response
): Promise<any | never> {
    if (p_response.ok) {
        return p_response.json().catch(() => { });
    } else {
        let json = {};
        try {
            json = await p_response.json();
        } catch { }
        const error = new Error("App Created Error") as ResponseError;
        error.response = p_response;
        error.json = json;
        error.status = p_response?.status;
        throw error;
    }
}

export const get = (
    p_route: string,
    p_useHost = true,
    noCache = false
): Promise<any> => {
    const newHeaders: Record<string, string> = { ...headers };

    if (noCache) {
        newHeaders["Cache-Control"] = "no-cache";
    }

    return fetch(`${p_useHost ? API_HOST : ""}${p_route}`, {
        headers: newHeaders,
    }).then((p_response) => handleResponse(p_response));
};

export const post = (
    p_route: string,
    p_body: any,
    p_useHost = true
): Promise<any> => {
    return fetch(`${p_useHost ? API_HOST : ""}${p_route}`, {
        headers,
        method: "POST",
        body: JSON.stringify(p_body),
    }).then(async (p_response) => await handleResponse(p_response));
};
export const jwtPost = (
    p_route: string,
    p_body: any,
    p_useHost: Boolean = true
): Promise<any> => {
    const headersObj = { ...headers, ...authHeader };
    const token = getToken();
    if (token) {
        headersObj.token = token;
    }
    return fetch(p_useHost ? `${API_HOST}` + p_route : p_route, {
        headers: headersObj,
        method: "POST",
        body: JSON.stringify(p_body),
    }).then(async (p_response) => await handleResponse(p_response));
};

export const jwtPut = (
    p_route: string,
    p_useHost: Boolean = true
): Promise<any> => {
    const headersObj = { ...headers, ...authHeader };
    const token = getToken();
    if (token) {
        headersObj.token = token;
    }
    return fetch(p_useHost ? `${API_HOST}` + p_route : p_route, {
        headers: headersObj,
        method: "PUT",
    }).then(async (p_response) => await handleResponse(p_response));
};

export const jwtGet = (
    p_route: string,
    p_useHost = true,
    noCache = false
): Promise<any> => {
    const headersObj = { ...headers, ...authHeader };
    const token = getToken();
    if (token) {
        headersObj.token = token;
    }
    const newHeaders = headers;
    if (noCache) {
        newHeaders["cache-control"] = "no-cache";
    }
    return fetch(p_useHost ? `${API_HOST}${p_route}` : p_route, {
        headers: headersObj,
    }).then((p_response) => handleResponse(p_response));
};
