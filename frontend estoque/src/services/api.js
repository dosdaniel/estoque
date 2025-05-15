// src/services/api.js
import axios from 'axios'

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Função para criar um novo usuário
export const createUser = async (userData) => {
  return api.post('/users', userData)
}

// Você pode exportar outras funções para outros endpoints
// export const getAllUsers = () => api.get('/users')

export default api
