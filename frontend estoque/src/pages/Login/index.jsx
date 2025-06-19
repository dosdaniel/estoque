import React, { useState } from 'react'
import axios from 'axios'
import {
  Input,
  Heading,
  Field,
  Stack,
  Button,
  Flex,
  ButtonGroup,
  Image,
  InputGroup
} from "@chakra-ui/react"
import { PasswordInput } from '../../components/ui/password-input'
import Card from '../../components/ui/card'
import { useNavigate } from 'react-router-dom'
import { CiLock, CiMail } from "react-icons/ci"
import { useAuth } from '../../context/AuthContext'
import { Alert } from "@chakra-ui/react"

const inputStyles = {
  variant: "outline",
  px: 3,
  py: 2,
  _placeholder: { color: "gray.500" }
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!email || !password) {
      setErrorMessage('Preencha os campos de email e senha.')
      return
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password })
      if (response.status === 200) {
        login(response.data)
        navigate('/dashboard')
      } else {
        setErrorMessage('Credenciais inválidas.')
      }
    } catch (err) {
      console.error(err)
      // setErrorMessage(err.message)
      if (err.response) {
        if (typeof err.response.data === 'string') {
          setErrorMessage(err.response.data)
        } else if (err.response.data && err.response.data.error) {
          setErrorMessage(err.response.data.error)
        } else {
          setErrorMessage('Credenciais inválidas ou erro no servidor.')
        }
      } else {
        setErrorMessage('Falha de rede ou erro inesperado.')
      }
    }
  }

  return (
    <Flex>
      <Card mt="16">
        <Flex direction="column" align="center" mt="-8" mb="0">
          <Image
            src="https://i.imgur.com/FHRThEs.png"
            height="200px"
          />
        </Flex>
        <Heading
          mb="4"
          color="#ffffff"
          fontFamily="Inter"
          textAlign="center"
          fontSize="2.7rem"
          fontWeight="500"
          lineHeight="1.25"
        >
          Bem-vindo de Volta!
        </Heading>
        {errorMessage && (
          <Alert.Root status="error" variant="solid" mb="4" borderRadius="sm" p="2">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Erro</Alert.Title>
              <Alert.Description>{errorMessage}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        <form onSubmit={handleLogin} noValidate>
          <Stack gap="4">
            <Field.Root>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<CiMail />} startElementProps={{ ml: "3" }}>
                <Input
                  {...inputStyles}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  css={{ "--focus-color": "purple" }}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Senha <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<CiLock />} startElementProps={{ ml: "3" }}>
                <PasswordInput
                  {...inputStyles}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  css={{ "--focus-color": "purple" }}
                />
              </InputGroup>
            </Field.Root>
            <ButtonGroup>
              <Button
                color="white"
                size="lg"
                variant="outline"
                w="125px"
                type="button"
                onClick={() => navigate('/')}
              >
                Voltar
              </Button>
              <Button
                colorPalette="purple"
                color="white"
                size="lg"
                variant="outline"
                ml="auto"
                w="125px"
                type="submit"
              >
                Entrar
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Card>
    </Flex>
  )
}

export default Login
