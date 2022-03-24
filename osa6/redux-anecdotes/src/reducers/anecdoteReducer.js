import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdoteVote(state, action) {
      return state.map(a =>
        a.id !== action.payload.id ? a : action.payload
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setAnecdoteVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(setAnecdoteVote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer