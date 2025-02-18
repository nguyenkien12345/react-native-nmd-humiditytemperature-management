import { baseURL, commonHeadersAPI } from '@/constants'

export const getAll = async () => {
  try {
    const options = { method: 'GET' }
    return await (await fetch(`${baseURL}/list`, options)).json()
  } catch (error) {
    console.log(`Error when call api getAll: ${error}`)
  }
}

export const getDetail = async (id) => {
  try {
    const options = { method: 'GET' }
    return await (await fetch(`${baseURL}/detail/${id}`, options)).json()
  } catch (error) {
    console.log(`Error when call api getDetail: ${error}`)
  }
}

export const addData = async (data) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: commonHeadersAPI
    }
    return await (await fetch(`${baseURL}/add-data`, options)).json()
  } catch (error) {
    console.log(`Error when call api addData: ${error}`)
  }
}

export const updateData = async (data) => {
  try {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: commonHeadersAPI
    }
    return await (await fetch(`${baseURL}/update`, options)).json()
  } catch (error) {
    console.log(`Error when call api updateData: ${error}`)
  }
}

export const deleteData = async (id) => {
  try {
    const options = { method: 'DELETE' }
    return await (await fetch(`${baseURL}/delete/${id}`, options)).json()
  } catch (error) {
    console.log(`Error when call api deleteData: ${error}`)
  }
}
