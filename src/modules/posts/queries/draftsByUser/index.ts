import { arg, nonNull, queryField } from 'nexus'

export const draftsByUser = queryField((t) => {
  t.list.field('draftsByUser', {
    type: 'Post',
    args: {
      userUniqueInput: nonNull(
        arg({
          type: 'UserUniqueInput',
        }),
      ),
    },
    resolve: (_parent, args, context) => {
      return context.prisma.user
        .findUnique({
          where: {
            id: args.userUniqueInput.id || undefined,
            email: args.userUniqueInput.email || undefined,
          },
        })
        .posts({
          where: {
            published: false,
          },
        })
    },
  })
})
