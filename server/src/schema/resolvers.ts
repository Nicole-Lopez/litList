import axios, { AxiosResponse } from 'axios';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

// const getDataExample = async (id: string): Promise<Post> => {
//   const response: AxiosResponse<Post> = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

//   return response.data;  
// }
const getDataExample = (id: string): Post => {
  let example = {
    userId: 1,
    id: 45,
    title: 'hello',
    body: 'world'
  }

  return example
}



export const resolvers = {
  Query: {
    getPosts: async (root, args) => {
      try {
        const {id} = args

        const posts = await getDataExample(id);



        return posts

      } catch (error) {
        console.error(error);
      }
    },
  },
};
