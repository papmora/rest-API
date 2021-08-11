import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Select, Input, Box, Button} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { updateDefaultClause } from "typescript";

export interface DataTableProps{
    
}

const DataTable: React.FC<DataTableProps> = ()=> {

    const [spaces,updateSpaces] = useState([]);
    const [reservations,updateReservations] = useState([]);

    useEffect( ()=> {
        const getData = async () => {
            const resp = await fetch('http://127.0.0.1:3000/api/spaces');
            const json = await resp.json();
            console.log(json)
            updateSpaces(json)
        }
        getData();
    }, []);

    useEffect( ()=> {
        const getData = async () => {
            const resp = await fetch('http://127.0.0.1:3000/api/reservations');
            const json = await resp.json();
            console.log(json)
            updateReservations(json)
        }
        getData();
    }, []);
    

    
    return ( 
        <div>
            <Box display="flex" alignItems= 'center' justifyContent="center">
            <Table size="sm" variant="striped" colorScheme="teal">
            <TableCaption textAlign="center">Current reservations</TableCaption>
            <Thead>
            <Tr>
                <Th>Spot</Th>
            
                <Th>State</Th>
            </Tr>
            </Thead>
            <Tbody>
            
            {
                spaces.map((object:any, i) => {
                    return (
                        <Tr>
                            <Td>{object.id}</Td>
                            
                            <Td>{object.estado}</Td>
                        </Tr>
                    )
                })
                
            }
            </Tbody>
        </Table>
        </Box>
        
        <Box className='rowC' marginLeft="20px">
        <Button onClick={()=>window.location.reload()}>Refresh</Button>
        <Input placeholder="Search" width="280px" marginLeft="200px"/>
        <Select placeholder="Filter by" size="sm" alignSelf="Right" width="120px" marginLeft="3px"> 
            <option value="option1">State</option>
            <option value="option1">Spot</option>
        </Select>
        </Box>
      </div>
        
        
      
    );
}
export default DataTable;