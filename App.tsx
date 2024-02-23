import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';
import io from 'socket.io-client';

export default function App() {
  const [screenshotUri, setScreenshotUri] = useState<string>("");

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:3000',{transports:['websocket']}); // Adjust the URL based on your server's address
    
    socket.on('connect', () => {
      console.log('connceted')
    });

    socket.on('message', (data: any) => {
      console.log('Message from server:', data);
    });
    socket.on('screenShot', (data: any) => {
      setScreenshotUri(data);
      console.log('Screenshot URI from server:', data);
    });

    // Clean up: Disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); 

  return (
    <View style={styles.container}>
    {screenshotUri !== "" && <Image source={{ uri: screenshotUri }} style={styles.image} />}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});