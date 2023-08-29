
fetch('https://64eb9f5ae51e1e82c5778973.mockapi.io/burnafterwriting', { 
    method: 'GET', 
    headers: {'content-type' : 'application/json'}
}).then(res => { 
    if (res.ok) { 
        return res.json();
    }
}).then(thoughts => { 
    thoughts.forEach(thought => { 
        console.log(thought);
    })
}).catch(error => { 
    console.error('API request failed', error);
});