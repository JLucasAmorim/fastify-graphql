import { intArg, queryField } from 'nexus'

export const postById = queryField((t) => {
  t.nullable.field('postById', {
    type: 'Post',
    args: {
      id: intArg(),
    },
    resolve: (_parent, args, context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id || undefined },
      })
    },
  })
})
