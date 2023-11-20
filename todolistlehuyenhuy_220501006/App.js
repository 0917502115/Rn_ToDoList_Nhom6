import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
      FullName: Le Huyen Huy{'\n'}
      Phone: 0917502115{'\n'}
      Student ID: 220501006{'\n'}
      Email: huyle801534326@gmail.com{'\n'}
      Hobbies: Play game....</Text>
      <Card>
        <AssetExample />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "White",
    padding: 8,
  },
  paragraph: {
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
