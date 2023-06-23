import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {DataUpdateAction} from './module/mainSaga/actions';
import PropTypes from 'prop-types';

const Main = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchedUser, setSearchedUser] = useState({});
  const data = useSelector(state => state.data.data);
  const SearchIcon = require('../src/images/search.png');
  const CrossImg = require('../src/images/cross.png');
  const error = 'This user is not exist';
  const Placeholder = 'Search...';

  const handleSearch = () => {
    dispatch(DataUpdateAction(searchValue));
  };

  useEffect(() => {
    if (data) {
      if (Object.keys(data).length > 0) {
        setSearchedUser(data);
      }
    } else {
      setSearchedUser({});
    }
  }, [data]);

  useEffect(() => {
    if (searchValue == '') {
      setSearchedUser({});
    }
  }, [searchValue]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{width: '75%', justifyContent: 'center'}}>
          <Image style={styles.imgView} source={SearchIcon} />
          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={txt => setSearchValue(txt)}
            placeholder={Placeholder}
          />
          {searchValue !== '' && (
            <Pressable style={styles.cross} onPress={() => setSearchValue('')}>
              <Image style={styles.crossImgView} source={CrossImg} />
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={searchValue !== '' ? handleSearch : null}
          style={[
            styles.searchButton,
            {
              opacity: searchValue == '' ? 0.4 : 1,
            },
          ]}>
          <Text style={styles.btnText}>Search</Text>
        </Pressable>
      </View>
      {searchedUser.err == 'error' && Object.keys(searchedUser).length > 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView>
          {searchedUser && Object.keys(searchedUser).length > 0 && (
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

              {searchedUser &&
                searchedUser.length > 0 &&
                searchedUser.slice(0, 10).map((item, index) => (
                  <View
                    key={item.name}
                    style={[
                      styles.resultRow,
                      {backgroundColor: index % 2 && '#E9F2D3'},
                    ]}>
                    <View style={styles.cell}>
                      <Text
                        style={[
                          styles.cellText,
                          {color: item.isSearchedUser && 'red'},
                        ]}>
                        {item.name}
                      </Text>
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
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
  },
  imgView: {
    position: 'absolute',
    tintColor: 'grey',
    height: 30,
    width: 30,
    marginLeft: 5,
  },
  crossImgView: {
    tintColor: 'grey',
    height: 12,
    width: 12,
  },
  searchButton: {
    backgroundColor: '#A7C941',
    height: 40,
    width: '25%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 5,
    paddingLeft: 40,
    paddingRight: 40,
    height: 40,
  },
  resultContainer: {
    flex: 1,
    borderColor: '#A7C941',
    borderWidth: 0.4,
    width: '95%',
    alignSelf: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    backgroundColor: '#A7C941',
    padding: 10,
    width: '100%',
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
    borderBottomColor: '#A7C941',
    borderBottomWidth: 0.4,
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
    textAlign: 'center',
  },
  cross: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    backgroundColor: '#C1C1C1',
    height: 20,
    width: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
});

Main.propTypes = {
  dispatch: PropTypes.func,
  searchValue: PropTypes.string,
  searchedUser: PropTypes.object.isRequired,
  data: PropTypes.array,
};

export default Main;
