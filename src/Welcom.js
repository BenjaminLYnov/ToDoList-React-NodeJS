// import React, { Component } from "react";
// // import $ from 'jquery';
// import axios from 'axios';

// class Welcom extends Component {

//     constructor() {
//         super();
//         this.state = {
//             age: 0
//         }




//     }




//     render() {
//         return (
//             <div>
//                 <h1> Welcom {this.props.name}</h1 >
//                 <button onClick={() => this.sendAjax()}>Ajax</button>
//                 <button onClick={() => this.add()}>Up Age  </button>
//                 <button onClick={() => this.remove()}>Down Age  </button>
//                 <p>{this.state.age}</p>
//             </div>
//         );
//     };

//     // Functions

//     add() {
//         this.setState({
//             age: this.state.age += 1,
//         });
//     }

//     remove() {
//         this.setState({
//             age: this.state.age -= 1,
//         });
//     }

//     // sendAjax = () => {
//     //     $.ajax({
//     //         type: 'POST',          // La méthode cible (POST ou GET)
//     //         url: 'static/js/C:/Programmation/React/projet 1/my-app/src/App.js',        // Script Cible
//     //         // url: '../../static/js/C:/Programmation/React/projet 1/my-app/src/ajax.php',        // Script Cible
//     //         asynch: false          // Ici on force l'appel de manière synchrone
//     //     });
//     // }
//     // sendAjax = () => {
//     //     $.ajax({
//     //         url: "C:/Programmation/React/projet 1/my-app/src/ajax.js",
//     //         dataType: 'json',
//     //         type: 'POST',
//     //         // success: function (data) {
//     //         //     this.setState({ data: data });
//     //         // }
//     //     });
//     // }
//     sendAjax = () => {

//         // const setState = state => this.setState(state);
//         // // With all properties

//         // let body = {
//         //     userId: 1111,
//         //     title: "This is POST request with body",
//         //     completed: true
//         // };

//         const url = "./ajax.php";
//         // const data = { name: "John", location: "Boston" };
//         let formData = new FormData();    //formdata object
//         formData.append('name', 'ABC');   //append the values with key, value pair
//         formData.append('age', 20);

//         const config = {     
//             headers: { 'content-type': 'multipart/form-data' }
//         }
        
//         axios.post(url, formData, config)
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(error => {
//                 console.log(error);
//             });

//         // const url = "./ajax.js";
//         // $.ajax({
//         //     url: url,
//         //     dataType: "json",
//         //     type: 'GET',
//         //     data: "data=" + JSON.stringify(data),
//         //     success: function (data) {
//         //         alert('success');
//         //     }
//         // });

//         // const serializedData = JSON.stringify(data);
//         // $.ajax({type: 'POST', url: url, dataType: 'json', data: "data=" + serializedData,
//         // 	success: function(data) {
//         //         alert("toot");
//         // 	}
//         // });
//     }
// }

// export default Welcom;