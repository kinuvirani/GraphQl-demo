import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Form,FormGroup,Label,Input} from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const EDIT_CATEGORY = gql`
  mutation updateData($Category_id:Int,$Category_Name:String,$active:Int!) {
    updateData(Category_id:$Category_id, Category_Name:$Category_Name,active:$active) {
        Category_id
        Category_Name
        active
    }
  }
`;


class EditData extends React.Component{
    state={
        Category_Name:'',
        active:0,
        Category_id:0
    }
   componentWillReceiveProps(props){
        this.setState({Category_Name:props.data.Category_Name,active:props.data.active,Category_id:props.data.Category_id})
   }  
    render(){
        debugger
        return(
            <div>
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
              <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
              <ModalBody>
                <Form>
                    <FormGroup >
                        <Label for="exampleEmail">Category_Name</Label>
                            <Input type="text" name="email" id="exampleEmail" value={this.state.Category_Name} onChange={(e)=>{this.setState({Category_Name:e.target.value})}}/>
                    </FormGroup>
                    <FormGroup >
                        <Label for="examplePassword">Status</Label>
                            <Input type="text" name="password" id="examplePassword" value={this.state.active} onChange={(e)=>{this.setState({active:e.target.value})}}/>
                    </FormGroup> 
                </Form>
              </ModalBody>
              <ModalFooter>
                  <Mutation mutation={EDIT_CATEGORY} variables={{Category_id:this.state.Category_id, Category_Name: this.state.Category_Name, active: this.state.active }} onCompleted={this.props.toggle}
                    update={(cache,{data:{updateData}})=>{
                      
                        let Display=this.props.query
                        const {CourceAll}=cache.readQuery({query:Display})
                        const {Category_id,Category_Name,active}=updateData
                       
                        let i=CourceAll.findIndex(data=>parseInt(data.Category_id,10)===parseInt(Category_id,10))
                        
                        CourceAll[i]={...CourceAll[i],Category_Name,active}
                        console.log("Update Data==",CourceAll)
                        cache.writeQuery({
                            query:Display,
                            data:{CourceAll:CourceAll}
                        })
                    }}>
                    { 
                        (handleSubmit) => {
                            return <Button color="success" onClick={handleSubmit}>Edit</Button> 
                        }
                    }
                  </Mutation>

                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }

}
export default EditData