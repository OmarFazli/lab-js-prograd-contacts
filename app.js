//Enter your code here..

document.querySelector('#btnGet').onclick = function(){

    //production code
    var p = new Promise((resolve, reject) => {
        var rqst = new XMLHttpRequest;
        rqst.open('GET','https://jsonplaceholder.typicode.com/users');
        rqst.onload = () => {
            if(rqst.status == 200){
                resolve(rqst.response);
            }
            else{
                reject(Error(rqst.statusText))
            }
        };

        rqst.onerror = () => {
            reject(Error('Error occured; Could not fetch data'))
        }
        rqst.send();
    });

    //consumption code
    p.then((response) => {
        console.log(response);
        var result = JSON.parse(response);
        
        var players = '<h2>Lists of Users</h2>';
        result.forEach(function(user){
            players+=
            `<div class="player">
              <div class="strength">Name : ${user.name}</div>
              <div>Email   : ${user.email}</div>
              <div>Phone   : ${user.phone}</div>
              <div>Website : ${user.website}</div>
              <div>Company : ${user.company.name}</div>
              <div>City    : ${user.address.city}</div>
              <div>Zipcode : ${user.address.zipcode}</div>
             </div>`
        });

        document.querySelector('#message').innerHTML = players;

    })
    .catch((error) => {
        console.log('Promise rejected.');
        console.log(error)
    })

}

