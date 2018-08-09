import React from 'react'
import PropTypes from 'prop-types'
import {asObject} from './reducer'

class App extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
  
  addNew = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: asObject(event.target.anecdote.value)
    })
    event.target.anecdote.value = ''
  }

  sortedAnecdotes = (anecdotes) => {
    const sorted = anecdotes.sort((a, b) => {return (b.votes - a.votes)})
    return sorted
  }

  render() {
    const anecdotes = this.sortedAnecdotes(this.props.store.getState())
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} {'  '}
              <button onClick={this.vote(anecdote.id)}> vote</button>
            </div>
          </div>
        )}
        <h2>Create new</h2>
        <form onSubmit={this.addNew}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App