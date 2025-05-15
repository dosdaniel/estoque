import { Box } from "@chakra-ui/react"

const Card = ({ children, ...props }) => {
  return (
    <Box
      w="400px"
      maxW="md"
      mx="auto"
      p="8"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="rgba(0, 0, 0, 0.70)"
      {...props}
    >
      {children}
    </Box>
  )
}

export default Card
