import createClient from "openapi-fetch";
import { paths } from "./types";


const client = createClient<paths>({ baseUrl: "http://localhost:3000" })

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
