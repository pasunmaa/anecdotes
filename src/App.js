import React from 'react'
import PropTypes from 'prop-types'

class App extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
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
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App