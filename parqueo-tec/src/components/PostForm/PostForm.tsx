import { Stack, Input, Button, Box,  useToast } from "@chakra-ui/react";
import React from "react";
import axios from "axios";


interface IProps{

}
interface PostFormProps {
   placa?: string;
}


class PostForm extends React.Component<IProps,PostFormProps> {

    constructor(props:IProps){
        super(props);
        this.state = {
            placa: ''
        };
    }
    
    
    onSubmit = (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:3000/api/reservations',this.state)
        .then(response => {
            console.log(response)
            alert("Reservation Succeeded")
        })
        .catch(error=> {
            console.log(error)
            alert("Reservation Failed")
        })
    }
    
    changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
        

    }
    render () {
        const {placa} = this.state
        return (
            <Box width="400px" marginLeft="300px" marginTop="30px" alignSelf="center">
            
                <h1> Submit a request to Reserve space </h1> 
                <form onSubmit = {this.onSubmit}>
                    <Stack spacing={3}>
                        <Input variant="outline" placeholder="Plate" name='placa' width="400px" alignSelf="left" value={placa} onChange={this.changeHandler} />
                        <Button type="submit" colorScheme="teal" variant="outline" width="100px" alignSelf="center">
                         Submit
                        </Button>
                    </Stack>
                </form>
            
            </Box>
        )
    }
}

export default PostForm; 