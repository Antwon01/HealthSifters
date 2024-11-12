export default class APIRequest {
    
    // calls the loginInformation end point from the back end.
    static userLoginInfo(body){
        return fetch('http://localhost:8080/loginInformation', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    }

    // Admin login
    static adminLoginInformation(body) {
        return fetch('http://localhost:8080/adminInformation', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
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

    static getNavItems() {
        return fetch('http://localhost:8080/navItems', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));
    }
    
      // Calls the endpoint to add a new navbar item
      static addNavItem(body) {
        return fetch('http://localhost:8080/navItems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));
    }
}