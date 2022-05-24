import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const postSchema = Schema(
  {
    text: String,
    image: {
      url: String,
      id: String,
      thumb1: String,
      thumb2: String,
      main: String,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pinned: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: Schema.Types.ObjectId, ref: 'Post' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    numberLikes: Number,
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
postSchema.plugin(toJSON)
postSchema.plugin(paginate)

// Indexs
postSchema.index({ text: 'text' })

/**
 * @typedef Post
 */
export const Post = mongoose.model('Post', postSchema)
