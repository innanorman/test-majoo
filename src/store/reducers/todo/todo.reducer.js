import TodoListTypes from './todo.types'

const { SET_TODOLIST, ISLOADING, SET_SUBMITDATA, SET_UPDATECOMPLETE, SET_DATABYID, SET_UPDATEDATA, SET_DELETEDATA } = TodoListTypes

const initialState = {
  todoListData: [],
  isLoadingPage: false,
  dataById: null,
  newListData: []

}

const todoList = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case ISLOADING: 
      return {
        ...state,
        isLoadingPage: payload
      }
    case SET_TODOLIST: 
      return {
        ...state,
        todoListData: payload
      }
    case SET_SUBMITDATA:
      return {
        ...state,
        todoListData: payload
      }
    case SET_UPDATECOMPLETE:
      return {
        ...state,
        todoListData: payload
      }
    case SET_DATABYID:
      return {
        ...state,
        dataById: payload
      }
    case SET_UPDATEDATA:
      return {
        ...state,
        todoListData: payload
      }
    case SET_DELETEDATA:
      return {
        ...state,
        todoListData: payload
      }
    default:
      return state;
  }
}

export default todoList