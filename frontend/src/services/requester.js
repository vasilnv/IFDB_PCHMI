import { HOST } from "../constants/env.js";

const urlBuilder = (...paths) => {
    const url = paths
            .filter(x => x && typeof(x) === "string")
            .join('');

    return url;
}

const initRequest = async (contentType, method, body) => {
    return {
        method,
        credentials: 'include',
        headers: {
            ...(contentType && { 'Content-Type': contentType }),
        },
        body
    }
};

const initBaseRequest = initRequest.bind(null, "application/json");

const responseHandler = async res => {
    if (!res.ok) {
        if (res.status === 401) {
            let response = await res.json();

            if(response.error?.details !== 'Specify id token for this request!') {
                //logout();
                console.log('logout')
            }

            throw response;
        }

        throw await res.json();
    }
    return res.json();
};

const requester = (endpoint) => ({
    get: () => initBaseRequest('GET').then(options => fetch(urlBuilder(HOST, endpoint), options)).then(responseHandler),
    create: data => initBaseRequest('POST', JSON.stringify(data)).then(options => fetch(urlBuilder(HOST, endpoint), options)).then(responseHandler),
    uploadFile: data => initRequest(null, 'POST', data).then(options => fetch(urlBuilder(HOST, endpoint), options)).then(responseHandler),
    update: data => initBaseRequest('PUT', JSON.stringify(data)).then(options => fetch(urlBuilder(HOST, endpoint), options)).then(responseHandler),
    delete: () => initBaseRequest('DELETE').then(options => fetch(urlBuilder(HOST, endpoint), options)).then(responseHandler),
})

export default requester;
