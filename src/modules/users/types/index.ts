import { Post } from '@prisma/client'
import { inputObjectType, objectType } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: async (parent, _, context) => {
        const userPosts: Post[] | null = await context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
        return userPosts || []
      },
    })
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

export { User, UserUniqueInput, UserCreateInput }
