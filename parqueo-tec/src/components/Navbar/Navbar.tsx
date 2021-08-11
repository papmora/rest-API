import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";
import React from "react";

interface NavbarProps{

}

const Navbar: React.FC<NavbarProps> = () => {
  
  return(
    <Flex>
      <Box p="2">
        <Heading size="md">Parqueo TEC</Heading>
      </Box>
      <Spacer />
      {/* <Box>
        <Button colorScheme="teal" marginRight="3px" marginTop="3px" >Refresh</Button>
      </Box> */}
  </Flex>
  )

}
export default Navbar;