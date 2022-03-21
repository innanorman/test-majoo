import axios from "axios"
import TodoListTypes from './todo.types'

const { SET_TODOLIST, ISLOADING, SET_SUBMITDATA, SET_UPDATECOMPLETE, SET_DATABYID, SET_UPDATEDATA, SET_DELETEDATA } = TodoListTypes

export const setToDoListData = data => {
  return {
    type: SET_TODOLIST,
    payload: data
  }
}

export const setSubmitData = data => {
  return {
    type: SET_SUBMITDATA,
    payload: data
  }
}

export const setUpdateCompleteData = data => {
  return {
    type: SET_UPDATECOMPLETE,
    payload: data
  }
}

export const setDataById = data => {
  return {
    type: SET_DATABYID,
    payload: data
  }
}

export const setUpdateData = data => {
  return {
    type: SET_UPDATEDATA,
    payload: data
  }
}

export const setDeleteData = data => {
  return {
    type: SET_DELETEDATA,
    payload: data
  }
}

const isLoading = (params) => ({
  type: ISLOADING,
  payload: params
})


export const getTodoListData = () => {
  return (dispatch) => {
    axios.get(`https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`)
    .then((response) => {
      dispatch(setToDoListData(response.data))
      dispatch(isLoading(false))
    })
    .catch((error) => {
      dispatch(isLoading(false))
      console.log(error)
    })
  }
}

export const submitTodo = (payload, data) => {
  return (dispatch) => {
    const newData = [...data, payload]
    dispatch(setSubmitData(newData))
  }
}

export const updateCompleteData = (payload) => {
  return (dispatch) => {
    dispatch(setUpdateCompleteData(payload))
  }
}

export const getEditData = (data) => {
  return (dispatch) =>{
    dispatch(setDataById(data))
  }
}

export const updateTodo = (data) => {
  return (dispatch) =>{
    dispatch(setUpdateData(data))
  }
}

export const deleteData = (data) => {
  return (dispatch) => {
    dispatch(setDeleteData(data))
  }
}