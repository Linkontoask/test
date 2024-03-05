/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import PullToRefreshNative from './test';

const data: any = [];
for (let i = 0; i < 500; i++) {
  data.push({
    key: `data-${i}`,
    text: `number: ${i}`,
    on: false,
  });
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
  },
});

const Item = ({title}: {title: string}) => (
  <View style={styles1.item}>
    <Text style={styles1.title} onPress={console.log}>
      {title} <Text>{Platform.OS}</Text>
    </Text>
  </View>
);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setLoading(false);
        resolve('');
      }, 3000);
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <PullToRefreshNative
          refreshing={loading}
          onRefresh={onRefresh}
          text="南美、非洲等国家外汇少，本币报价获得更多商机">
          <FlatList
            style={{overflow: 'scroll'}}
            data={data}
            nestedScrollEnabled
            renderItem={(renderItem: any) => {
              const {item} = renderItem;
              return <Item title={item.key} />;
            }}
          />
        </PullToRefreshNative>
      </View>
    </SafeAreaView>
  );
}

export default App;
