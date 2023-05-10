import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function Dashboard() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [chartName, setChartName] = useState('');
  const [queryName, setQueryName] = useState('');
  const [query, setQuery] = useState('');

  async function handleOnClick() {
    console.log('clicked react button');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/create_dashboard',
        {
          id: id,
          name: name,
          sections: [
            {
              name: 'section1',
              rows: [
                {
                  charts: [
                    {
                      name: chartName,
                      sources: [
                        {
                          name: queryName,
                          query: query,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          url: url,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>Dashboard</div>
      <Form>
        <Form.Group controlId="formId">
          <Form.Label>Dashboard ID</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter dashboard ID"
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Dashboard Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter dashboard name"
          />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label>Dashboard URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Enter dashboard URL"
          />
        </Form.Group>
        <Form.Group controlId="formChartName">
          <Form.Label>Chart Name</Form.Label>
          <Form.Control
            type="text"
            value={chartName}
            onChange={(event) => setChartName(event.target.value)}
            placeholder="Enter chart name"
          />
        </Form.Group>
        <Form.Group controlId="formQueryName">
          <Form.Label>Query Name</Form.Label>
          <Form.Control
            type="text"
            value={queryName}
            onChange={(event) => setQueryName(event.target.value)}
            placeholder="Enter query name"
          />
        </Form.Group>
        <Form.Group controlId="formQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter query"
          />
        </Form.Group>
        <Button onClick={handleOnClick}>Create Dashboard</Button>
      </Form>
    </>
  );
}

export default Dashboard;