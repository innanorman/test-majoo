import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const ActivityForm = ({ handleSubmit, isDisabled, setActivity, setDescription, activity, description }) => {
  return (
    <div className='input-activities'>
      <h3> Input New Todo List </h3>
      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mb-10">
          <Label>
            Activity
          </Label>
          <Input
            name="activity"
            placeholder="example : Read a book"
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-10">
          <Label>
            Description
          </Label>
          <Input
            name="description"
            placeholder="example : A story book"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color={isDisabled ? 'secondary' : 'primary'} disabled={isDisabled}>
          Submit
        </Button>
      </Form>
    </div>

  )
}

export default ActivityForm