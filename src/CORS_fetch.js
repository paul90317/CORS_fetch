function CORS_fetch(obs_url,opt){
    let url=`http://{host}/?url=${obs_url}`
    if(opt)return fetch(url,opt);
    return fetch(url);
}