import React, { useState } from 'react'
import { Form, Button, InputGroup, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline className="mobile-search">
      <FormGroup>
        <InputGroup>
          <Form.Control
            type="text"
            name="search"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products ..."
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button className="p-2 ms-2" variant="outline-success" type="submit">
            Search
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  )
}

export default SearchBox
