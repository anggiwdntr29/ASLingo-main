import React, {useState} from 'react';
import {Center, Image, Spinner} from 'native-base';
import {Pressable, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomVideoPlayer = ({videoUri, thumbnailUri}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlayPress = () => {
    setIsPlaying(true);
    setIsLoaded(false);
  };

  return (
    <Center flex={1} borderWidth={2} borderColor="Primary">
      {thumbnailUri && !isPlaying && (
        <Pressable onPress={handlePlayPress} style={styles.thumbnailContainer}>
          {!isLoaded && (
            <>
              <Image
                source={{uri: thumbnailUri}}
                style={styles.thumbnailImage}
                alt=""
              />
              <Icon
                name="play"
                size={42}
                color="#008DDA"
                style={styles.playIcon}
              />
            </>
          )}
        </Pressable>
      )}

      {isPlaying && (
        <>
          {isBuffering && (
            <Center style={styles.bufferingContainer}>
              <Spinner accessibilityLabel="Buffering video" />
            </Center>
          )}
          <VideoPlayer
            source={{uri: videoUri}}
            resizeMode="cover"
            paused={!isPlaying}
            onLoad={() => setIsLoaded(true)}
            onBuffer={() => setIsBuffering(true)}
            onReadyForDisplay={() => setIsBuffering(false)}
            onError={e => console.error('Video error:', e)}
            muted
            controlTimeout={2000}
            repeat
            disableFullscreen
            disableVolume
            disableBack
            tapAnywhereToPause
          />
        </>
      )}
    </Center>
  );
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playIcon: {
    position: 'absolute',
    zIndex: 3,
  },
  bufferingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
});

export default CustomVideoPlayer;
