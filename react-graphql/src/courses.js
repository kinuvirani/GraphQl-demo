import React from 'react'
import {Query,Mutation} from "react-apollo";
import gql from 'graphql-tag'
import {MDBBtn, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import Add from './add'
import Edit from './edit'

const DELETE_USER = gql`
        mutation deleteUser($Category_id: Int) {
             deleteData(Category_id: $Category_id){
                    message
                }
        }`;

const Display=gql`
        query{
        CourceAll{
            Category_id
            Category_Name
            active
        }
     }`

class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          amodal: false,
          emodal: false,
          edit:{}
        };
        this.atoggle = this.atoggle.bind(this);
        this.etoggle = this.etoggle.bind(this);
      }
    
      atoggle() {
        this.setState(prevState => ({
          amodal: !prevState.amodal
        }));
      }
      etoggle() {
        this.setState(prevState => ({
          emodal: !prevState.emodal
        }));
      }

    handleCheck(e){
        console.log("data=",e.target.id)
    }
    render(){
        return(
            <div className="container" style={{marginTop:'50px'}}>
            <MDBBtn color="blue"  onClick={this.atoggle}>Add</MDBBtn>
            <Add modal={this.state.amodal} toggle={this.atoggle} query={Display}/>
           
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <Query query={Display}>
                            {({loading,error,data})=>{
                                if(loading) return<p>Loading....</p>;
                                if(error) return<p>error....</p>;
                                return data.CourceAll.map((course,i)=>(
                                    <tr key={i}>
                                        <td>{course.Category_id}</td>
                                        <td>{course.Category_Name}</td>
                                        <td>{course.active}</td>

                                        <Mutation mutation={DELETE_USER}  variables={{ Category_id: parseInt(course.Category_id, 10) }}
                                          update={(cache, { data: { deleteData } }) => {
                                            let { CourceAll } = cache.readQuery({ query: Display });
                                            console.log("CourseAll data===",deleteData.Category_id)
                                            CourceAll = CourceAll.filter(user => parseInt(user.Category_id, 10) !== parseInt(course.Category_id, 10));
                                           
                                           cache.writeQuery({
                                                query: Display,
                                                data: { CourceAll: CourceAll }
                                            });
                                        }}>
                                            {
                                                ( deleteData )=> {
                                                    return (<MDBBtn color="red" onClick={deleteData}>Delete</MDBBtn>)
                                                }
                                            }
                                        </Mutation>

                                        <td><MDBBtn color="green" onClick={()=>{this.setState({edit:{...course},emodal: true})}}>Edit</MDBBtn></td>
                                    </tr>
                                ))
                            }}
                        </Query>
                        <Edit modal={this.state.emodal} toggle={this.etoggle} query={Display} data={this.state.edit}/>
                    </MDBTableBody>
                </MDBTable>
            </div>
        )
    }
}

export default Courses;
