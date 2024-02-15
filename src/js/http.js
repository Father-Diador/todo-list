import axios from "axios";

const http = {
    auth: function (params, callback) {
        axios.post('http://localhost:8083/auth', {
            username: params.login,
            password: params.password,
        })
        .then((res) => {
            callback(res);
        })
    },
    getCards: function (callback) {
        axios.get('http://localhost/8083/tasks')
        .then((res) => {
            callback(res);
        })
    },
};

export default http;