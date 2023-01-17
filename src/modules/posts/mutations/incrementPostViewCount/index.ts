import { intArg, mutationField, nonNull } from 'nexus'

export const incrementPostViewCount = mutationField('incrementPostViewCount', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, context) => {
    return context.prisma.post.update({
      where: { id: args.id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })
  },
})
