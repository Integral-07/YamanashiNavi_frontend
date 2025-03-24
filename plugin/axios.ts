import axios from "axios";

const axios_instance = axios.create({
    headers:{
        "Content-Type": "application/json",
    },
});

axios_instance.interceptors.request.use(

    function(config){

        return config;
    },

    function (error){

        return Promise.reject(error);
    }
);

axios_instance.interceptors.response.use(

    function (response){

        return response;
    },

    function (error){

        const originalConfig = error.config;
        if(
            error.response &&
            error.response.status === 401 &&
            !originalConfig.retry
        ){
            //認証エラーならリトライ
            originalConfig.retry = true;

            //以下の場合はリトライしない
            if(originalConfig.url === "/api/web/login"){

                return Promise.reject(error);
            }
            
            axios_instance
            .post("/api/web/retry", {refresh:""})
            .then((response) => {
                return axios_instance(originalConfig);
            })
            .catch(function(error){
                return Promise.reject(error);
            });
        }
        else if(error.response && error.response.status !== 422){

            window.location.href = "/yamanashi_navi/login";
        }
        else{
            
            return Promise.reject(error);
        }
    }
);

export default axios_instance;