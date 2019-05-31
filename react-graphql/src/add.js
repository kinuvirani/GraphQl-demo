import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Form,FormGroup,Label,Input} from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_CATEGORY = gql`
  mutation addCategory($Category_Name: String,$active:Int!) {
    addCategory(Category_Name: $Category_Name,active:$active) {
        Category_id
        Category_Name
        active
    }
  }
`;

class ModalExample extends React.Component {
state={
    Category_Name:"",
    active:0
}
closeModal = () => {
    this.props.toggle();
}

  render() {
  
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup >
                    <Label for="exampleEmail">Category_Name</Label>
                        <Input type="text" name="email" id="exampleEmail" value={this.state.Category_Name} onChange={e => this.setState({ Category_Name: e.target.value })}/>
                </FormGroup>
                <FormGroup >
                    <Label for="examplePassword">Status</Label>
                        <Input type="text" name="password" id="examplePassword" value={this.state.active} onChange={e => this.setState({ active: parseInt(e.target.value,10) })} />
                </FormGroup> 
            </Form>
          </ModalBody>
          <ModalFooter>
        
          <Mutation mutation={ADD_CATEGORY} variables={{ Category_Name: this.state.Category_Name, active: this.state.active }} onCompleted={this.closeModal}
            update={(cache,{data:{addCategory}})=>{   
              console.log("Add data===",addCategory)           
              let Display=this.props.query
              const {CourceAll}=cache.readQuery({query:Display})
              CourceAll.unshift(addCategory)
              cache.writeQuery({
                query:Display,
                data:{CourceAll:CourceAll}
              })
            }}  
          >
              { 
                  (handleSubmit) => {
                      return <Button color="success" onClick={handleSubmit}>Submit</Button> 
                  }
              }
          </Mutation>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;