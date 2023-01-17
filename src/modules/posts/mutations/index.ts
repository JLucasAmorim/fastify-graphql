import { createDraft } from './createDraft'
import { deletePost } from './deletePost'
import { incrementPostViewCount } from './incrementPostViewCount'
import { togglePublishPost } from './togglePublishPost'

export const PostsMutation = {
  createDraft,
  deletePost,
  incrementPostViewCount,
  togglePublishPost,
}
