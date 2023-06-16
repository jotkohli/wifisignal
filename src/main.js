import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Provider, useDispatch, useSelector} from 'react-redux';

// Import the JSON data
import dataa from './json/json';
import {store} from './redux/store';
import {DataUpdateAction, GetDataAction} from './module/Register/actions';
const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [error, setError] = useState('');
  const [val, setVal] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data);
  // console.log('DATA ======', dataArr);
  // const [dataArr, setDataArr] = useState([data]);
  //   let NewData = Object.values(dataa);
  let NewData = Object.values(data);
  // const [display, setDisplay] = useState(NewData);
  useEffect(() => {
    dispatch(GetDataAction());
  }, []);

  const handleSearch = () => {
    dispatch(DataUpdateAction(searchValue));
    setSearchedUser(true);

    // if (!user) {
    //   // User not found
    //   setError(
    //     'This user name does not exist! Please specify an existing user name!',
    //   );
    // }
  };

  return (
    console.log(data),
    (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={searchValue}
              onChangeText={txt => setSearchValue(txt)}
              placeholder="Enter user name"
            />
            <Button
              disabled={searchValue == ''}
              title="Search"
              onPress={handleSearch}
            />
          </View>
          <ScrollView>
            {searchedUser ? (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Name</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Rank</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Number of bananas</Text>
                  </View>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerText}>Is the user?</Text>
                  </View>
                </View>

                {NewData &&
                  NewData.length > 0 &&
                  NewData.slice(0, 10).map((item, index) => (
                    <View key={item.name} style={styles.resultRow}>
                      <View style={styles.cell}>
                        <Text style={styles.cellText}>{item.name}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={styles.cellText}>
                          {item?.rank || index + 1}
                        </Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={styles.cellText}>{item.bananas}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text style={styles.cellText}>
                          {item.isSearchedUser ? 'yes' : 'no'}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            ) : (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </Provider>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    flex: 1,
    // marginHorizontal: 10,
  },
  resultHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    width: '95%',
    alignSelf: 'center',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  resultRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default Main;
