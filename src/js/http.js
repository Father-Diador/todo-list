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
    getCards: function (jwt, callback) {
        axios.get('http://localhost:8083/tasks', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then((res) => {
            callback(res.data);
        })
    },
    saveCard: function (params, callback) {
        axios.post('http://localhost:8083/create/tasks', {
            params: params.card,
            name: params.name,
        },
        {
            headers: {
                Authorization: `Bearer ${params.jwt}`,
            },
        })
        .then((res) => {
            callback(res);
        })
    },
    deleteCard: function (params, callback) {
        axios.delete(`http://localhost:8083/delete/tasks/${params.id}`, {
            name: params.name,
        },
        {
            headers: {
                Authorization: `Bearer ${params.jwt}`,
            },
        })
        .then((res) => {
            callback(res);
        })
    },
    editCard: function (params, callback) {
        axios.patch(`http://localhost:8083/update/tasks/${params.id}`, {
            params: params.card,
            name: params.name,
        },
        {
            headers: {
                Authorization: `Bearer ${params.jwt}`,
            },
        })
        .then((res) => {
            callback(res);
        })
    },
};

export default http;