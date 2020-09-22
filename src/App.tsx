import React, { useState } from 'react';
import InputComponent from './components/InputComponent/InputComponent';
import ListComponent from './components/ListComponent/ListComponent';
import './App.scss';
import { IContributor } from './typescript/Interfaces'
import { State } from './typescript/Types'



function App() {

  const [state, setState] = useState<State>({ organisation: '', repo: '' });
  const [pageNum, setPageNum] = useState<number>(1)
  const [error, setError] = useState(null);
  const [contributors, setContributors] = useState<IContributor[]>([])

  const fetchContributors = (org: string, repo: string, num: number) => {
    fetch(`https://api.github.com/repos/${org}/${repo}/contributors?per_page=40&page=${num}`)
      .then(response => response.json())
      .then(response => {
        if (response.message) {
          setError(response.message)
        } else {
          setContributors(response);
        }
      })
      .catch(err => {
        setError(err)
      })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPageNum(1)
    setError(null)
    fetchContributors(state.organisation, state.repo, pageNum)
  }

  const changePage = (num: number) => {
    setPageNum(num)
    fetchContributors(state.organisation, state.repo, num)
    window.scrollTo(0, 0)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div>
      <div className="title">Search for GitHub repository contributors</div>
      <div className="title sub">Enter the name of the organisation and repository below</div>
      <InputComponent handleSubmit={handleSubmit} handleChange={handleChange} state={state}></InputComponent>
      <ListComponent contributorList={contributors} error={error} pageNum={pageNum} changePage={changePage} ></ListComponent>
    </div>
  );
}

export default App;
