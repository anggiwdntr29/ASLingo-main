import {ScrollView, Stack} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../api/AuthContext';
import Home from '../api/Home';
import {Box_Activity, Box_Class, HeaderContent} from '../components';
import {RefreshControl} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';

const HomeScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [thumbnailPath, setThumbnailPath] = useState('');

  const fetchThumbnail = async videoUrl => {
    try {
      const thumbnailData = await createThumbnail({url: videoUrl});
      setThumbnailPath(thumbnailData.path);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsRefreshing(false);

    try {
      const response = await Home(user.auth.access_token);
      setHomeData(response);

      if (response?.recent_activity?.video) {
        await fetchThumbnail(response.recent_activity.video);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user.auth.access_token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
  }, [fetchData]);

  return (
    <Stack flex={1}>
      <HeaderContent data={user} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <Box_Class
          data={homeData}
          isLoading={isLoading}
          navigation={navigation}
        />
        <Box_Activity
          data={homeData}
          isLoading={isLoading}
          thumbnail={thumbnailPath}
        />
      </ScrollView>
    </Stack>
  );
};

export default HomeScreen;
