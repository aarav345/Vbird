import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import BottomNav from "../components/BottomNav";
import { Audio } from "expo-av";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AudioScreen = () => {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {}
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} >
          <Text >
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([]);
  }

  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="font-bold">hello</Text>
      <Button
        title={recording ? "Stop Recording" : "Start Recording\n\n\n"}
        onPress={recording ? stopRecording : startRecording}
      />
      {getRecordingLines()}
      <Button
        title={recordings.length > 0 ? "\n\n\nClear Recordings" : ""}
        onPress={clearRecordings}
      />
      <BottomNav />
    </View>
  );
};

export default AudioScreen;
