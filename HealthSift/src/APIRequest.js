export default class APIRequest {
    
    // calls the loginInformation end point from the back end.
    static userLoginInfo(body){
        // sends body which includes username and password and returns the object returned from backend
        return fetch('http://localhost:8080/loginInformation', {
            'method': 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    }

    // calls the adminInformation end point from the back end
    static adminLoginInformation(body) {
        // sends body which includes username and password and returns the object returned from backend
        return fetch('http://localhost:8080/adminInformation', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    }

    // calls the forgotPassword end point from the back end
    static forgotPassword(body) {
        // sends body which includes email and prints the status of the return call from back end
        return fetch('http://localhost:8080/forgotPassword', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.status))
        .catch(error => console.log(error))
    }

    // calls the signUpInformation end point from the back end
    static signUpInformation(body) {
        // sends body which includes email, password, and repassword and returns the object returned from backend
        return fetch('http://localhost:8080/signUpInformation', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    }

    static searchQuery(body) {
        return fetch('http://localhost:8080/searchQuery', {
            'method' : 'POST',
            headers : {'Content-type' : 'application/json'},
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    }
}