import { Mic } from '@mui/icons-material';
import React, { useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ButtonGroup, Button, LinearProgress, CircularProgress } from '@mui/material';
import "./style.css"

const Dictaphone = () => {
    const intervalRef = useRef(null)
    const [ms, setms] = useState(0)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    let milliseconds = ms

    function startTimer() {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setms(milliseconds += 10);
        }, 10);
    }

    function stopTimer() {
        clearInterval(intervalRef.current);
    }

    function resetTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setms(0)
    }

    function returnData(option) {
        let s = milliseconds
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        transcript.replace(" ", "")
        let wc = transcript.split(" ").length;
        if (option === "time") {
            return hrs + ':' + mins + ':' + secs + '.' + ms;
        }
        if (option === "wordCount") {
            return wc
        }
        if (option === "wpm") {
            var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
            let minutes = milliseconds / 60000;
            let wpm = Math.floor(wc / minutes)
            if (seconds > 2.75) {
                // 130
                return wpm
            }
            return <CircularProgress />
        }
        if (option === "botcheck") {
            var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
            let minutes = milliseconds / 60000;
            let wpm = Math.floor(wc / minutes)
            if (seconds > 2.75) {
                return 100 - ((wpm / 130) * 100)
            }
            else { return 0 }
        }
    }

    return (
        <div>
            <h1>{returnData("time")}</h1>
            <p>Microphone: {listening ? 'on' : 'off'}<br />Words Per Minute: {returnData("wpm")}</p>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => { SpeechRecognition.startListening({ continuous: true }); startTimer(); }} variant="contained" color="success" endIcon={<Mic />}>Start</Button>
                <Button onClick={() => { SpeechRecognition.stopListening(); stopTimer() }} variant="contained">stop</Button>
                <Button onClick={() => { resetTranscript(); resetTimer() }}>Reset</Button>
            </ButtonGroup>
            <div>
                <h2>Bot Likelihood</h2>
                <p>{returnData("botcheck")}%</p>
                <LinearProgress variant="determinate" thick size={100} value={returnData("botcheck")} />
            </div>
            <h1>Captured Text</h1>
            <p>word count: {transcript.length !== 0 ? returnData("wordCount") : 0}</p>
            <p className="transcript-capture">{transcript}</p>
        </div>
    );


};
export default Dictaphone;