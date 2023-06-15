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
import {GetDataAction} from './module/Register/actions';
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
  let NewData = Object.values(data) || [];
  const [display, setDisplay] = useState(NewData);
  useEffect(() => {
    dispatch(GetDataAction());
  }, []);

  const handleSearch = () => {
    //     let topTen = NewData.sort((a, b) => b.bananas - a.bananas).slice(0, 10);
    //     let user = topTen.find((e, index) => {
    //       if (e.name == searchValue) {
    //         let lastRank = e;
    //         console.log(lastRank);
    //         return {e, index};
    //       }

    //       if (user) {
    //         topTen.splice(user.index, 1, user.e);
    //       }
    //     });

    //     setSearchValue(topTen);
    //   };
    // Find the searched user in the data
    const user = NewData.find(e => {
      console.log(e.name); // Debugging statement to check the name property
      if (e.name === searchValue) {
        // const val = NewData.findIndex(e => {
        //   if (e.name === searchValue) {
        //     return e;
        //   }
        // });
        //   setVal(val);
        return e;
      }
    });

    if (!user) {
      // User not found
      setError(
        'This user name does not exist! Please specify an existing user name!',
      );
      setSearchedUser(null);
    } else {
      // User found
      setError('');
      let topTen = NewData.sort((a, b) => b.bananas - a.bananas).slice(0, 10);
      const userAdd = topTen.find((e, index) => {
        e.name == searchValue;
        return e;
        // console.log(ret);
        // return e;
        console.log('User found===', e.name == searchValue, index);
      });

      const userIndex = NewData.findIndex((e, index) => {
        const ret = {e, index};
        if (e.name == searchValue) {
          return ret;
        } else {
          return null;
        }
        console.log(ret);
        // return e;
        console.log('User found===', e.name == searchValue, index);
      });

      console.log(userAdd, userIndex);

      if (user?.bananas >= userAdd?.bananas) {
        // User has enough bananas to be in the top 10
        setSearchedUser(user);
        alert('hit');
      } else {
        alert('hit1');
        console.log('USER LENGTHX', user);
        // Replace the searched user with the last rank from the top 10
        const lastRank = {
          ...user,
          rank: userIndex,
          bananas: user?.bananas,
          isSearchedUser: true,
        };
        let dd = NewData.sort((a, b) => b.bananas - a.bananas).splice(
          9,
          1,
          lastRank,
        );
        console.log('ag=feter', dd);
        setDisplay(NewData);
        // console.log('NewData', user);
        display.slice(9, 1, lastRank);
        setSearchedUser(lastRank);
      }
    }
  };
  //   console.log('TYPE OF ===', NewData);

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

                {display &&
                  display.length > 0 &&
                  display
                    .sort((a, b) => b.bananas - a.bananas)
                    .slice(0, 10)
                    .map((item, index) => (
                      <View key={item.name} style={styles.resultRow}>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.name}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{index + 1}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.bananas}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>
                            {item.name === searchedUser.name ? 'yes' : 'no'}
                          </Text>
                        </View>
                      </View>
                    ))}

                {searchedUser.rank > 10 && (
                  <View style={styles.resultRow}>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{searchedUser.name}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{searchedUser.rank}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>
                        {searchedUser.bananas}
                      </Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>yes</Text>
                    </View>
                  </View>
                )}
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
