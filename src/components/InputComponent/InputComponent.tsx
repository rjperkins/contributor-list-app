import React from 'react'
import { State } from '../../typescript/Types'
import './InputComponent.scss'

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  state: State
}

export default function InputComponent({ handleSubmit, handleChange, state }: Props) {

  return (
    <form data-testid='form' onSubmit={handleSubmit} >
      <div className='form-container'>
        <div className='form-group field'>
          <input type='input' className='form-field' placeholder='Organisation' value={state.organisation} name='organisation' id='organisation' onChange={handleChange} required />
          <label htmlFor='organisation' className='form-label'>Organisation</label>
        </div>
        <div className='form-group field'>
          <input type='input' className='form-field' placeholder='Repository' value={state.repo} name='repo' id='repo' onChange={handleChange} required />
          <label htmlFor='repo' className='form-label'>Repository</label>
        </div>
        <button className='button' type='submit' >Search</button>
      </div>
    </form>
  )
}
