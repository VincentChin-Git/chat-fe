import { useEffect } from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  useEffect(() => {
    setTimeout(() => {}, 10000);
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
