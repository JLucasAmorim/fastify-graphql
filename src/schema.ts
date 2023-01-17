import { makeSchema, asNexusMethod, enumType, connectionPlugin } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import * as UsersQuery from './modules/users/queries'
import * as PostsQuery from './modules/posts/queries'
import * as UserTypes from './modules/users/types'
import * as PostTypes from './modules/posts/types'
import * as UsersMutations from './modules/users/mutations'
import * as PostsMutation from './modules/posts/mutations'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

export const schema = makeSchema({
  types: [
    UsersQuery,
    PostsQuery,
    UsersMutations,
    PostsMutation,
    PostTypes.Post,
    UserTypes.User,
    UserTypes.UserUniqueInput,
    UserTypes.UserCreateInput,
    PostTypes.PostCreateInput,
    SortOrder,
    PostTypes.PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  plugins: [connectionPlugin()],
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
