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
        <Flex direction="column" align="center" mt="-12" mb="-10">
          <Image src='https://media.discordapp.net/attachments/1145714113419415573/1354984651827056791/logo.png?ex=68024e0b&is=6800fc8b&hm=35a6f69a2d4b9e623e261cb65bc6fa1e7bc101c9597ab4180fc460468b1ea0a0&=&format=webp&quality=lossless&width=960&height=960'
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
