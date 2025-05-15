import React from 'react'
import Card from '../../components/ui/card'
import { Flex, Text } from '@chakra-ui/react'

function Dashboard() {

  return (
    <Flex height="60vh" align="center">
      <Card mt="-4">
        <Text>Ola mundo!</Text>
      </Card>
    </Flex>
  )
}

export default Dashboard
