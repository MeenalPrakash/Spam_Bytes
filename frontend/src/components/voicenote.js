import React from "react";
import vmsg from "vmsg";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box'


const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
});

class App extends React.Component {
  state = {
    isLoading: false,
    isRecording: false,
    recordings: [],
  };
  record = async () => {
    this.setState({ isLoading: true });

    if (this.state.isRecording) {
      const blob = await recorder.stopRecording();
      this.setState({
        isLoading: false,
        isRecording: false,
        recordings: this.state.recordings.concat(URL.createObjectURL(blob)),
      });
    } else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        this.setState({ isLoading: false, isRecording: true });
      } catch (e) {
        console.error(e);
        this.setState({ isLoading: false });
      }
    }
  };
  render() {
    const { isLoading, isRecording, recordings } = this.state;
    return (
      <React.Fragment>
        <Box
                    sx={{
                      height: '10%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
        <Button
          variant="contained"
          sx={{ 
            position: 'relative',
                        width: { lg: '50%', xs: '45%' },
                        backgroundColor: 'secondary.main',
                        color: 'primary.contrastColor',
          }}
          disabled={isLoading}
          onClick={this.record}
        >
          {isRecording ? "Stop" : "Record Audio"}
        </Button></Box>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recordings.map((url) => (
            <li key={url}>
              <audio src={url} controls />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default App;
