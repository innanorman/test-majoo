import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import './App.css';
import ActivityForm from './component/ActivityForm';
import SectionLists from './component/SectionLists';
import { deleteData, getEditData, getTodoListData, submitTodo, updateCompleteData, updateTodo } from './store/reducers/todo/todo.action';

function App() {
  const dispatch = useDispatch()
  const { todoListData, dataById } = useSelector((state) => state.todoList)
  const [incompleteData, setIncompleteData] = useState()
  const [completeData, setCompleteData] = useState()
  const [formAction, setFormAction] = useState()
  const [activity, setActivity] = useState()
  const [description, setDescription] = useState()
  const [selectedId, setSelectedId] = useState()
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const date = new Date().toISOString()
  const formatDate = moment(date).format("YYYY-MM-DD HH:mm")
  

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()

    setIsDisabled((activity === undefined || "") && (description === undefined || ""))
    
    const latestId = todoListData.length + 1

    const payload = {
      id: latestId,
      status: 0,
      title: activity,
      description: description,
      createdAt: formatDate
    }
     
    const updateData = todoListData.filter(value => {
      if (value.id === selectedId){
        value.title = activity
        value.description = description
        value.createdAt = formatDate
      }
      return value
    })

    let submitAction = formAction !== 'edit' ? submitTodo(payload, todoListData) : updateTodo(updateData)

    dispatch(submitAction)
    alert('Success add data')
    resetFields()
  }, [activity, description, todoListData, dispatch, formatDate, formAction, selectedId])

  const handleUpdate = (id) => {
    setFormAction('update')
    setSelectedId(id)
    const filterDataId = todoListData.filter(item => item.id === id)
    const dataObj = {}
    filterDataId.map(value => Object.keys(value).forEach(item => dataObj[item] = value[item]))
    dispatch(getEditData(dataObj))
  }

  const handleDelete = (id) => {
    const deletedId = todoListData.filter(item => item.id !== id)
    dispatch(deleteData(deletedId))
  }

  const handleCompleteTask = useCallback((id) => {
    const filteredData = todoListData.filter(item => {
      if (item.id === id){
        item.status = 1
      }
      return item
    })
    dispatch(updateCompleteData(filteredData))
  }, [todoListData, dispatch])

  const resetFields = () => {
    setActivity("")
    setDescription("")
  }

  useEffect(() => {
    dispatch(getTodoListData())
  }, [])

  useEffect(() => {
    if (todoListData) {
      setCompleteData(todoListData.filter(value => value.status === 1).sort((a, b) => a.createdAt < b.createdAt ? 1 : - 1 ))
    }
  }, [todoListData])

  useEffect(() => {
    if (todoListData) {
      setIncompleteData(todoListData.filter(value => value.status === 0).sort((a, b) => a.createdAt > b.createdAt ? 1 : - 1 ))
    }
  }, [todoListData])

  useEffect(() => {
    if (formAction === 'update'){
      setActivity(dataById?.title)
      setDescription(dataById?.description)
    }
  },[formAction, dataById])

  useEffect(() => {
    if ((activity === undefined || "") && (description === undefined || "")){
      setIsDisabled(true)
    } else{
      setIsDisabled(false)
    }
  }, [activity, description])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="8">
            <ActivityForm 
              handleSubmit={handleFormSubmit} 
              setActivity={setActivity} 
              setDescription={setDescription} 
              resetFields={resetFields} 
              activity={activity} 
              description={description}
              isDisabled={isDisabled}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h3>Todo list</h3>
            <SectionLists 
              data={incompleteData} 
              handleUpdate={handleUpdate} 
              handleDelete={handleDelete} 
              handleCompleteTask={handleCompleteTask} 
              setSelectedId={setSelectedId} 
              show={show} setShow={setShow} 
            />
          </Col>
          <Col>
            <h3>Complete Task</h3>
            <SectionLists 
              data={completeData} 
              handleUpdate={handleUpdate} 
              handleDelete={handleDelete} 
              handleCompleteTask={handleCompleteTask} 
              setSelectedId={setSelectedId}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
