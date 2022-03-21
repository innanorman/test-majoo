import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap'
import ActivityList from './ActivityList'

const SectionLists = ({ data, handleCompleteTask, handleUpdate, handleDelete }) => {
  return (
    <div>
      {
        data && data.map((value, key) => 
          <ActivityList 
            key={key}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleCompleteTask={handleCompleteTask}
            title={value.title}
            description={value.description}
            status={value.status}
            id={value.id}
          />
        )
      }
      
    </div>
  )
}

export default SectionLists