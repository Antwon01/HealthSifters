export default class APIRequest {
    
    static userLoginInfo(body){

        return fetch('http://localhost:8080/loginInformation', {
            'method': 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data.status))
        .catch(error => console.log(error))
    }
}