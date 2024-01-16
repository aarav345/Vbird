import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity, Alert } from "react-native";
import BottomNav from "../components/BottomNav";
import { Audio } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MicrophoneIcon, StopCircleIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import { AndroidAudioEncoder, AndroidOutputFormat } from "expo-av/build/Audio";
import { AuthProvider, useAuth } from "../AuthContext/AuthContext";

const AudioScreen = () => {
  const { user } = useAuth();
  const [recording, setRecording] = React.useState(null);
  const [recordings, setRecordings] = React.useState([]);
  const [isRecordingInProgress, setIsRecordingInProgress] =
    React.useState(false);
  const [audioSent, setAudioSent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  async function startRecording() {
    try {
      if (isRecordingInProgress) {
        console.log(
          "Recording in progress. Finish or stop recording to start a new one."
        );
        return;
      }

      if (recording || recordings.length > 0) {
        Alert.alert("Clear the previous recording before starting a new one.");
        return;
      }

      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();


        const RECORDING_OPTIONS_PRESET_LOW_QUALITY = {
          android: {
            extension: ".wav",
            outputFormat: AndroidOutputFormat.MPEG_4,
            audioEncoder: AndroidAudioEncoder.AAC,
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 64000,
          
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };

        await recording.prepareToRecordAsync(
          RECORDING_OPTIONS_PRESET_LOW_QUALITY
        );
        await recording.startAsync();

        setRecording(recording);
        setIsRecordingInProgress(true);
      }
    } catch (err) {
      Alert.alert("Error starting recording", err);
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
      Alert.alert("Error stopping recording", err);
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

  const sendAudio = async (audioUri) => {
    try {
      setAudioSent(true);

      const formData = new FormData();
      formData.append("audio_file", {
        uri: audioUri,
        type: "audio/mpeg",
        name: "audio.wav",
      });

      const response = await fetch(
        "https://vbird.onrender.com/process_audio/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setServerResponse(responseData);
        console.log("Audio successfully sent. Server response:", responseData);
      } else {
        console.error(
          "Failed to send audio. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} className=" flex flex-row items-center">
          <Text className=" font-bold text-xl">
            Recording | {recordingLine.duration}
          </Text>
          <View className=" ml-4 flex flex-row space-x-4">
            <View>
              <Button
                onPress={() => {
                  recordingLine.sound.replayAsync();
                  setIsPlaying(true);
                }}
                title="Play"
              ></Button>
            </View>
            <View>
              <Button
                onPress={() => {
                  recordingLine.sound.pauseAsync();
                  setIsPlaying(false);
                }}
                title="Pause"
              ></Button>
            </View>
            <View>
              <Button
                onPress={() => {
                  const durationInSeconds = convertDurationToSeconds(
                    recordingLine.duration
                  );
                  console.log("Duration (seconds):", durationInSeconds);

                  if (durationInSeconds > 10) {
                    sendAudio(recordingLine.file);
                  } else {
                    Alert.alert(
                      "Error",
                      "The recorded audio should be greater than 10 seconds"
                    );
                  }
                }}
                title="Find"
              ></Button>
            </View>
            {audioSent && serverResponse && (
              <Text>
                {serverResponse ? (
                  serverResponse.result
                ) : (
                  <Loading size="large" className="mt-20" />
                )}
              </Text>
            )}
          </View>
        </View>
      );
    });
  }

  function convertDurationToSeconds(duration) {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  function clearRecordings() {
    setRecordings([]);
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Please sign in to access audio functionality</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center gap-4">
      <TouchableOpacity
        className=" border-2 border-green-500 p-8 rounded-full"
        onPress={isRecordingInProgress ? stopRecording : startRecording}
      >
        {recording || isRecordingInProgress ? (
          <StopCircleIcon size={hp(6)} strokeWidth={4.5} color="#228B22" />
        ) : (
          <MicrophoneIcon size={hp(6)} strokeWidth={4.5} color="#228B22" />
        )}
      </TouchableOpacity>

      {isRecordingInProgress && (
        <Text className=" text-red-700">
          Recording in progress. Finish or stop recording to start a new one.
        </Text>
      )}

      {getRecordingLines()}
      {recordings.length > 0 && (
        <TouchableOpacity
          onPress={clearRecordings}
          className="bg-red-700 py-2.5 px-2 rounded-sm"
        >
          <Text className=" text-white">Clear Recordings</Text>
        </TouchableOpacity>
      )}

      <BottomNav />
    </View>
  );
};

export default AudioScreen;
