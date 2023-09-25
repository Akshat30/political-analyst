/**
 * Send request with text in body to AWS API Gateway
 * NOTE: Takes about 5-10 seconds to receive a response
 * @param {string} text - text to be sent to AWS API Gateway
 * @returns {Promise} - Promise object represents response from AWS API Gateway to display to user
 * @throws {Error} - if text is not a string or is empty
 * @throws {Error} - if response from AWS API Gateway is not 200
 */
export async function sendText(text) {
    if (typeof text !== 'string' || text === '') {
        throw new Error('text must be a non-empty string');
    }

    const url = 'https://6nmdei0ejb.execute-api.us-west-1.amazonaws.com/chat';
    const body = {
        text: text,
        link: ""
    };
    const params = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    return await fetch(url, params)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            return data;
        })
        .catch((err) => {
            throw err;
        });
    
}

/**
 * Send request with link in body to AWS API Gateway
 * NOTE: Takes about 5-10 seconds to receive a response
 * @param {string} link - link to be sent to AWS API Gateway
 * @returns {Promise} - Promise object represents response from AWS API Gateway to display to user
 * @throws {Error} - if link is not a string or is empty
 * @throws {Error} - if response from AWS API Gateway is not 200
 */
export async function sendLink(link) {
    if (typeof link !== 'string' || link === '') {
        throw new Error('link must be a non-empty string');
    }

    const url = 'https://6nmdei0ejb.execute-api.us-west-1.amazonaws.com/chat';
    const body = {
        text: "",
        link: link
    };

    const params = {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return await fetch(url, params)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(`Response from AWS: ${data}`)
            return data;
        })
        .catch((err) => {
            throw err;
        });
}