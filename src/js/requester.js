const Requester = {
    post(url, data) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })
    }
}

export default Requester