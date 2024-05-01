const requestAuthenticatedAPI =(url, body, method )=>{
    const token = localStorage.getItem('token');

   return fetch(url,
   {
       method: method,
       body:JSON.stringify({...body}),
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       }
   }
   )
}

