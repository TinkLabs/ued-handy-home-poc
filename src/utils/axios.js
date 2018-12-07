import axios from 'axios';
// import getConfig from 'getConfig';
// import cookie from 'utils/Cookie';

// import Android from 'utils/Android';
// import getConfigExample from './exampleResponse/getConfig';
// import getOrderHistoryExample from './exampleResponse/getOrderHistory';

const axiosInstance = axios.create({
    baseURL: "localhost:3000/",
});

/*
response = {
    // `data` is the response that was provided by the server
    data: {},
    // `status` is the HTTP status code from the server response
    status: 200,
    // `statusText` is the HTTP status message from the server response
    statusText: 'OK',
    // `headers` the headers that the server responded with
    // All header names are lower cased
    headers: {},
    // `config` is the config that was provided to `axios` for the request
    config: {},
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
}
*/

axiosInstance.interceptors.request.use(
    (config) => {
        // if (getConfig().env !== 'ldev' && config.method === 'post') return config;
        return {
            ...config,
            // url: `${config.url}?someParam=someParam`,
        };
    },
    error => {
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        // console.log(error)
        if (error.config.url.includes('/subscribe')) {
            if (error.config.method === 'post') {
                // console.log(Object.keys(error))
                // console.log(error.config)
                // console.log(error.request)
                // console.log(error.response)
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            status: 300,
                            statusText: 'error',
                            headers: {},
                            config: error.config,
                        });
                    }, 800);
                });
            }
        }
        // if (error.config.url.includes('/config')) {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve({
        //                 data: getConfigExample,
        //                 status: 200,
        //                 statusText: 'OK',
        //                 headers: {},
        //                 config: error.config,
        //             });
        //         }, 800);
        //     });
        // }
        // if (error.config.url.includes('/order_history')) {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve({
        //                 data: getOrderHistoryExample,
        //                 status: 200,
        //                 statusText: 'OK',
        //                 headers: {},
        //                 config: error.config,
        //             });
        //         }, 800);
        //     });
        // }
        return Promise.resolve(error);
    },
);

export default axiosInstance;