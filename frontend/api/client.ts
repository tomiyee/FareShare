import createClient from 'openapi-fetch';
import { paths } from './types';

const baseUrl = 'http://192.168.0.113:3000'

const client = createClient<paths>({ baseUrl });

export default client;

// Example

// const { data } = useQuery({
//   queryKey: ["test"], queryFn: async () => {
//     return (await client.GET("/users/{id}", {
//       params: {
//         path: { id: 1 }
//       }
//     })).data
//   }
// })
