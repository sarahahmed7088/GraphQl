const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  

  
  type Post {
      id:ID!
    title: String
    author: String
  }

  type Query {
    Posts: [Post]
  }
  type Mutation {
      createPost(title: String,author: String):Post
      updatePost(id:ID!,title:String,author:String):[Post]
      deletePost(id:ID):[Post]
    
  }
`;
const Posts = [
    {
        id:1,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
        id:2,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      Posts: () => Posts,
    },
    Mutation:{
        createPost:(_,{title,author})=>{
            const newPost={id:3,title,author};
            Posts.push(newPost)
            return newPost
        },
        updatePost:(_,{id,title,author})=>{
            let postId=Posts.findIndex((post)=>post.id==id);
            let post={id,title,author};
            Posts[postId]=post
            return Posts
        },
        deletePost:(_,{id})=>{
            
            Posts=Posts.filter(item=>item.id != id)
            
            return Posts
        }
    }
  };
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });