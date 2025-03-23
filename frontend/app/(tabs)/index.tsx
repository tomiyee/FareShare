import { Text, View } from 'react-native';
import client from '@/api/client';
import { useQuery } from '@tanstack/react-query';

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const;

export default function Home() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const response = await client.GET('/users/{id}', {
        params: {
          path: { id: 1 },
        },
      });
      return response.data;
    },
  });

  return (
    <View style={styles.wrapper}>
      <Text>Home Page</Text>
      {isPending ? (
        <Text>Loading data...</Text>
      ) : isError ? (
        <View>
          <Text>Error</Text>
          <Text>{error.message}</Text>
        </View>
      ) : (
        <Text>{data?.name}</Text>
      )}
    </View>
  );
}
