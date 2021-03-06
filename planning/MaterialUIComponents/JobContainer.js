import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../config';
import Button from '@material-ui/core/Button';

function JobContainer({ match }) {
  useEffect(() => {
    const url = `${APIURL}/jobs/${match.params.id}`;
    fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(setJob)
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, []);

  const saveJob = () => {
    // If globalID works here, use it instead. (Need to test)
    const url = `${APIURL}/users/${userid}/save/${match.params.id}`;
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json());
  };

  const discardJob = () => {
    const url = `${APIURL}/users/${userid}/discard/${match.params.id}`;
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json());
  };

  if (error) {
    console.log(match.params.id);
    return <div>Job didn't render</div>;
  }

  return (
    <div className='JobContainer'>
      <div className='JobContainerButtons'>
        <Button color='primary' component={Link} to='/review'>
          Discard
        </Button>
        <Button color='primary' component={Link} to='/savedjobs'>
          Save
        </Button>
      </div>
      <h1>{job && job.title}</h1>
      <img
        className='logo'
        src={job && job.company_logo}
        alt={job && job.title}
      />
      <h3>{job && job.company}</h3>
      <p>{job && job.location}</p>
      <p>Posted: {job && job.created_at}</p>
      <h4>Apply:</h4>{' '}
      <div
        className='Apply'
        dangerouslySetInnerHTML={{ __html: job && job.how_to_apply }}
      />
      <div dangerouslySetInnerHTML={{ __html: job && job.description }} />
    </div>
  );
}

export default JobContainer;
