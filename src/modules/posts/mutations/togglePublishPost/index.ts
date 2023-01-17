import { intArg, mutationField, nonNull } from 'nexus'

export const togglePublishPost = mutationField('togglePublishPost', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, args, context) => {
    try {
      const post = await context.prisma.post.findUnique({
        where: { id: args.id || undefined },
        select: {
          published: true,
        },
      })
      return context.prisma.post.update({
        where: { id: args.id || undefined },
        data: { published: !post?.published },
      })
    } catch (e) {
      throw new Error(`Post with ID ${args.id} does not exist in the database.`)
    }
  },
})
