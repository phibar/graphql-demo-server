import { MemeActions } from '../actions/meme-actions'
import { MemeAction } from './../enums/meme-action'
import { IMemeListState } from '../interfaces/meme-list-state'

export const initState: IMemeListState = {
  memes: []
}

export const memeReducer = (state: IMemeListState = initState, action: MemeActions): IMemeListState => {
  switch (action.type) {
    case MemeAction.MemesLoaded:
      return { ...state, memes: action.payload }
    case MemeAction.MemeAdded:
      return { ...state, memes: [...state.memes, action.payload] }
    case MemeAction.MemeDeleted:
      return { ...state, memes: state.memes.filter((v) => v && v._id !== action.payload) }
    case MemeAction.MemeVoted:
      return { ...state, memes: state.memes.map(m=>m?._id === action.payload._id ? action.payload:m) }
  }
}
