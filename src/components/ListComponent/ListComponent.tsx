import React from 'react'
import './ListComponent.scss'
import { IContributor } from '../../typescript/Interfaces';
import githubLogo from '../../assets/github-logo.png'

type Props = {
  contributorList: IContributor[],
  error: null | string,
  pageNum: number,
  changePage: (num: number) => void
}

export default function ListComponent({ contributorList, error, changePage, pageNum }: Props) {

  const pageButtons = () => {
    return contributorList.length && !error ?
      <>
        <button className='button page' onClick={() => changePage(--pageNum)} disabled={pageNum === 1}>{'<<'}</button>
        <button className='button page' onClick={() => changePage(++pageNum)} disabled={contributorList.length < 40}>{'>>'}</button>
      </>
      :
      null
  }

  return (
    <div className='container'>
      {pageButtons()}
      <ul className='responsive-table'>
        {contributorList && contributorList.length ?
          <li className='table-header'>
            <div className='col col-1'>User</div>
            <div className='col col-2'>User ID</div>
            <div className='col col-3'>No. of Contributions</div>
            <div className='col col-4'>Profile link</div>
          </li> : null
        }
        {error ?
          <li className='table-row error'>
            <span className='col error' data-label='Error:'>{error}</span>
          </li>
          :
          contributorList && contributorList.length ?
            contributorList.map((contributor) => (
              <li className='table-row' key={contributor.id}>
                <div className='col col-1' data-label='Profile picture'>
                  <img src={contributor.avatar_url} alt='Github profile' className='github-pic' />
                  <div data-label='User Name'>{contributor.login}</div>
                </div>
                <div className='col col-2' data-label='User ID'>{contributor.id}</div>
                <div className='col col-3' data-label='No. of Contributions'>{contributor.contributions}</div>
                <div className='col col-4' data-label='Profile Link'>
                  <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" >
                    <img src={githubLogo} alt='GitHub logo' className='github-logo' />
                  </a>
                </div>
              </li>
            )) :
            null
        }
      </ul>
      {pageButtons()}
    </div>
  )
}

