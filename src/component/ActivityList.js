import React from 'react'
import { Button } from 'reactstrap'

const ActivityList = ({title, id, status, description, handleCompleteTask, handleUpdate, handleDelete}) => {
  return (
    <div className='wrapper-activity-list'>
      <h4>{title}</h4>
      <p>{description}</p>
      <Button
        color="primary"
        onClick={() => handleUpdate(id)}
        size="sm"
      >
        Edit
      </Button>

      {
        status === 0 &&
        <>
          <Button
            color="danger"
            onClick={() => handleDelete(id)}
            size="sm"
          >
            Delete
          </Button>

          <Button
            color="success"
            onClick={() => handleCompleteTask(id)}
            size="sm"
          >
            Complete Task
          </Button>
        </>
      }
    </div>
  )
}

export default ActivityList