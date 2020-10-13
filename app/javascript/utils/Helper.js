import axios from 'axios';

export async function Post(url,body){
    const response = await axios.post(url,body);
    return response.data;
}
export async function Get(url){
    const response = await axios.get(url);
    return response.data;
}

export function Interceptor() {
    axios.interceptors.request.use((config) => {
        console.log(`${config.method} ${config.url}`);
        config.headers.common['X-CSRF-TOKEN'] = document.querySelector('[name="csrf-token"]').content;
        config.headers.common['Content-Type']='application/json';
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}