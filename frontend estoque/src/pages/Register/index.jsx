import './style.css'
import React, { useState, useEffect } from 'react'
import {
  Input,
  Heading,
  Field,
  Stack,
  Button,
  Flex,
  Alert,
  ButtonGroup,
  Image,
  InputGroup
} from "@chakra-ui/react"
import { PasswordInput } from '../../components/ui/password-input'
import { createUser } from '../../services/api'  
import Card from '../../components/ui/card'
import { useNavigate } from 'react-router-dom'
import { LuUser } from "react-icons/lu"
import { CiLock, CiMail } from "react-icons/ci";

const inputStyles = {
  variant: "outline",
  px: 3,
  py: 2,
  _placeholder: { color: "gray.500" }
}

const alertStyles = {
  variant: "solid",
  mb: "4",
  borderRadius: "sm",
  p: "2"
}

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    let timer
    if (errorMessage || successMessage) {
      timer = setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [errorMessage, successMessage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (!username) {
      setErrorMessage('O campo Nome é obrigatório.')
      return
    }
    if (!email) {
      setErrorMessage('O campo Email é obrigatório.')
      return
    }
    if (!password) {
      setErrorMessage('O campo Senha é obrigatório.')
      return
    }
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    const userData = { username, email, password }
    try {
      const response = await createUser(userData) // <-- Uso do serviço
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Usuário cadastrado com sucesso!')
        setUsername('')
        setEmail('')
        setPassword('')
      } else {
        setErrorMessage('Falha ao cadastrar usuário.')
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      setErrorMessage('Erro ao conectar com o servidor.')
    }
  }

  return (
    <Flex height="80vh" align="center">
      <Card mt="4">
        <Flex direction="column" align="center" mt="-5" mb="0">
          <Image src='https://i.imgur.com/FHRThEs.png'
            height="200px"
          />
        </Flex>
        <Heading
          textAlign="center"
          mb="6"
          color="#ffffff"
          font-family="Inter"
          fontSize="2.7rem"
          fontWeight="500"
          lineHeight="1.25"
        >
          Cadastro de Usuários
        </Heading>
        {errorMessage && (
          <Alert.Root status="error" {...alertStyles}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Erro</Alert.Title>
              <Alert.Description>{errorMessage}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        {successMessage && (
          <Alert.Root status="success" {...alertStyles}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Sucesso</Alert.Title>
              <Alert.Description>{successMessage}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap="4">
            <Field.Root>
              <Field.Label>
                Nome <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<LuUser />} startElementProps={{ ml: "3" }}>
                <Input
                  {...inputStyles}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  css={{"--focus-color": "purple"}}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<CiMail />} startElementProps={{ ml: "3" }}>
                <Input
                  {...inputStyles}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  css={{"--focus-color": "purple"}}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Senha <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<CiLock />} startElementProps={{ ml: "3" }}>
                <PasswordInput
                  defaultValue="secret"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  css={{"--focus-color": "purple"}}
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
                Cadastrar
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Card>
    </Flex>
  )
}

export default Register
