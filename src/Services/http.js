
const joinURL=(baseURL,url)=>{return `${baseURL}/${url}`;}
class HttpService{
    constructor(){
            this.domain='http://localhost:8080/nestnavigate'
            // this.domain = 'http://localhost:8010/nestNavigator-0.0.1-SNAPSHOT'
    }
    request(url,method='POST',data=null,formflag){
        if(formflag)
           var headers={}

        else var headers={
            'Accept':'application/json',
            'Content-type':'application/json',
        }
        url=joinURL(this.domain,url);
        const options={
            headers,
            method,
            redirect: 'follow',
        }
        if(localStorage.getItem('AUTH_TOKEN')){
        headers.token=localStorage.getItem('AUTH_TOKEN');
        }
        if(data&&formflag){
            options.body=data;
        }
        else if(data)
            options.body=JSON.stringify({...data})
        return fetch(url,options)

    }
    async post(url,data,formflag=false){
        const method='POST';
        const res = await this.request(url, method, data,formflag);
        return await res.json();
    }
    async get(url,id=null){
        const method='GET';
        if(id)
        url=`${url}/${id}`

        const res = await this.request(url, method);
        return await res.json();
    }
    async put(url,data){
        const method='PUT';
        const res = await this.request(url, method, data);
        return await res.json();
    }
    async delete(url,formflag=false){
        const method='DELETE';
        const res = await this.request(url, method,formflag);
        return await res.json();
    }

}
export default HttpService;