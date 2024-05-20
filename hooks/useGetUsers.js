import axios from 'axios'
import { useQuery } from 'react-query'

export async function getAllUsers(){
    const response = await axios.get('/api/user')
    return response.data
}

export function useGetUser(){
  return useQuery(
    ['users'],
    () => {
      return getAllUsers()
    }
  )
}
