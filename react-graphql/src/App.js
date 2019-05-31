import React, { Component } from 'react';
import {ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost'
import './App.css';
import Course from './courses'
const client=new ApolloClient({
  uri:"http://localhost:8000"
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div>
        <h2>My First GraphQl react App</h2>
        <Course/>
      </div>
    </ApolloProvider>
    );
  }
}

// const App=()=>(
//     <ApolloProvider client={client}>
//       <div>
//         <h2>My First GraphQl react App</h2>
//         <Course/>
//       </div>
//     </ApolloProvider>
//     )

export default App;
