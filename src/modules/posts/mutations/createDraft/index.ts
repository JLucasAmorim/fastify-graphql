import { arg, mutationField, nonNull, stringArg } from 'nexus'

export const createDraft = mutationField('createDraft', {
  type: 'Post',
  args: {
    data: nonNull(
      arg({
        type: 'PostCreateInput',
      }),
    ),
    authorEmail: nonNull(stringArg()),
  },
  resolve: (_, args, context) => {
    return context.prisma.post.create({
      data: {
        title: args.data.title,
        content: args.data.content,
        author: {
          connect: { email: args.authorEmail },
        },
      },
    })
  },
})
