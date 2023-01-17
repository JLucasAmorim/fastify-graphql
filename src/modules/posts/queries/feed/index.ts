import { arg, intArg, queryField, stringArg } from 'nexus'

export const feed = queryField((t) => {
  t.nonNull.list.nonNull.field('feed', {
    type: 'Post',
    args: {
      searchString: stringArg(),
      skip: intArg(),
      take: intArg(),
      orderBy: arg({
        type: 'PostOrderByUpdatedAtInput',
      }),
    },
    resolve: (_parent, args, context) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {}

      return context.prisma.post.findMany({
        where: {
          published: true,
          ...or,
        },
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    },
  })
})
