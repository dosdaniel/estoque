import React from 'react'
import {
  Button,
  Flex,
  Heading,
  Text,
  Image
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/card'

function Home() {
  const navigate = useNavigate()

  return (
    <Flex height="60vh" align="center">
      <Card mt="-4">
        <Flex direction="column" align="center" mt="-12" mb="-4">
          <Image src='https://i.imgur.com/7htC2HW.png'
            height="250px"
          />
        </Flex>
        <Heading
          mb="4"
          color="#ffffff"
          font-family="Inter"
          textAlign="center"
          fontSize="2.7rem"
          fontWeight="500"
          lineHeight="1.25"
        >
          Bem-vindo!
        </Heading>
        <Text
          mb="8"
          color="gray.400"
          textAlign="left"
          lineHeight="1.3"
          fontSize="1.1rem"
        >
          Controle seu estoque com agilidade e segurança. Comece agora.
          {/*sfsdfsdf*/}
        </Text>
        <Flex w="100%" justify="space-between" align="center">
          <Button
            colorPalette="purple"
            color="white"
            size="lg"
            variant="outline"
            w="150px"
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>
          <Button
            colorPalette="purple"
            color="white"
            size="lg"
            variant="outline"
            w="150px"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </Button>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Home
