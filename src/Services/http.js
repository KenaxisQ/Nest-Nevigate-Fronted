
const joinURL = (baseURL, url) => { return `${baseURL}/${url}`; }
class HttpService {
    constructor() {
         // this.domain = 'http://103.127.31.155:8080/NN'
        // this.domain = 'http://localhost:8080'
        this.domain = 'http://localhost:8080/NN'
    }
    request(url, method = 'POST', data = null, formflag, islogin=false) {
            // const token = localStorage.getItem('authToken');
            // if(sessionStorage.getItem('AUTH_TOKEN'))
            var headers = {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        url = joinURL(this.domain, url);
        const options = {
            headers,
            method,
            redirect: 'follow',
        }
        if (!url.includes('auth')) {
            headers.Authorization=`Bearer ${sessionStorage.getItem('AUTH_TOKEN')}`
        }
        if (data && formflag) {
            options.body = data;
        }
        else if (data)
            options.body=JSON.stringify({...data});       
         return fetch(url, options)
    }
    async post(url, data, formflag = false, islogin = false) {
        const method = 'POST';
        const res = await this.request(url, method, data, formflag,islogin);
        return await res.json();
    }
    async get(url, id = null) {
        const method = 'GET';
        if (id)
            url = `${url}/${id}`

        const res = await this.request(url, method);
        return await res.json();
    }
    async put(url, data,formflag=false) {
        const method = 'PUT';
        const res = await this.request(url, method, data, formflag);
        return await res.json();
    }
    async delete(url, formflag = false) {
        const method = 'DELETE';
        const res = await this.request(url, method, formflag);
        return await res.json();
    }

}
export default HttpService;
