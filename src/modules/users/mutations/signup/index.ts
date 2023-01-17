import { arg, mutationField, nonNull } from 'nexus'

type Post = {
  title: string
  content?: string | null
}

export const signup = mutationField((t) => {
  t.nonNull.field('signup', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: 'UserCreateInput',
        }),
      ),
    },
    resolve: (_, args, context) => {
      const postData = args.data.posts?.map((post: Post) => {
        return { title: post.title, content: post.content || undefined }
      })
      return context.prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          posts: {
            create: postData,
          },
        },
      })
    },
  })
})
