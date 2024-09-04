import { StyleSheet,Text,View} from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', }}>
      <Text>titleContainer</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
