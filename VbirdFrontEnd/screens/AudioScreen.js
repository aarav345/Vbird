import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import BottomNav from "../components/BottomNav";
import { Audio } from "expo-av";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MicrophoneIcon, StopCircleIcon } from "react-native-heroicons/solid";

const AudioScreen = () => {
  const [recording, setRecording] = React.useState(null);
  const [recordings, setRecordings] = React.useState([]);
  const [isRecordingInProgress, setIsRecordingInProgress] = React.useState(false);

  async function startRecording() {
    try {
      if (isRecordingInProgress) {
        console.log("Already recording");
        return;
      }

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
        setIsRecordingInProgress(true);
      }
    } catch (err) {
      console.error("Error starting recording", err);
    }
  }

  async function stopRecording() {
    try {
      if (!recording) {
        console.log("No recording to stop");
        return;
      }

      await recording.stopAndUnloadAsync();
      let allRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      allRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });

      setRecordings(allRecordings);
      setIsRecordingInProgress(false);
    } catch (err) {
      console.error("Error stopping recording", err);
    } finally {
      setRecording(null);
    }
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
        <View key={index}>
          <Text>
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
    <View className="flex-1 justify-center items-center gap-4">
     
      <TouchableOpacity className="bg-green-500 p-8 rounded-full"
        onPress={isRecordingInProgress ? stopRecording : startRecording}
      >
        {recording || isRecordingInProgress ? (
          <StopCircleIcon size={hp(6)} strokeWidth={4.5} color="#228B22" />
        ) : (
          <MicrophoneIcon size={hp(6)} strokeWidth={4.5} color="#228B22"/>
        )}
      </TouchableOpacity>

      {isRecordingInProgress && (
        <Text className = " text-red-700">Recording in progress. Finish or stop recording to start a new one.</Text>
      )}

      {getRecordingLines()}
      {recordings.length > 0 && (
        <TouchableOpacity onPress={clearRecordings} className="bg-red-700 py-2.5 px-2 rounded-sm">
          <Text className=" text-white">Clear Recordings</Text>
        </TouchableOpacity>
      )}
      <BottomNav />
    </View>
  );
};

export default AudioScreen;
