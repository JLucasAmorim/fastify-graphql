import { intArg, mutationField, nonNull } from 'nexus'

export const deletePost = mutationField('deletePost', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, context) => {
    return context.prisma.post.delete({
      where: { id: args.id },
    })
  },
})
