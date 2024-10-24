export default class APIRequest {
    
    static userLoginInfo(body){

        return fetch('http://localhost:8080/loginInformation', {
            'method': 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    }

    static adminLoginInformation(body) {
        return fetch('http://localhost:8080/adminInformation', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.status))
        .then(error => console.log(error))
    }

    static forgotPassword(body) {
        return fetch('http://localhost:8080/forgotPassword', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.status))
        .catch(error => console.log(error))
    }

    static signUpInformation(body) {
        return fetch('http://localhost:8080/signUpInformation', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.status))
        .catch(error => console.log(error))
    }
}