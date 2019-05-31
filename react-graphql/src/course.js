import React from 'react'
import { MDBTable,MDBTableHead ,MDBTableBody,MDBBtn} from 'mdbreact';

class BasicTable extends React.Component{
    handleCheck(e){
        console.log("data=",e.target.id)
    }
   render()
    {
        return (
                <tr key={this.props.key1}>
                    <td>{this.props.course.Category_id}</td>
                    <td>{this.props.course.Category_Name}</td>
                    <td>{this.props.course.active}</td>
                    <td id={this.props.course.Category_id}><MDBBtn color="red" id={this.props.course.Category_id} onClick={this.handleCheck}>Delete</MDBBtn></td>
                    <td><MDBBtn color="green">Edit</MDBBtn></td>
                </tr>
        );
    }
}


//
// const Data=(props)=>(
//     <div>
//         <p>{` ${props.course.Category_id} by ${props.course.Category_Name}`}</p>
//     </div>
// )

export default BasicTable
