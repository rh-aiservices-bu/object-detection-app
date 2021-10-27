import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { resetVideo, sendImage } from "../actions";

import "./Video.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faStop, faSync, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function Video({
  reset,
  sendImage,
  user,
  userId,
  date,
  time,
  image,
  prediction,
  minScore,
  labelSettings,
  status,
}) {
  let history = useHistory();
  const [video, setVideo] = useState(null);
  const [captureCanvas, setCaptureCanvas] = useState(null);
  const [imageCanvas, setImageCanvas] = useState(null);
  const [zonesCanvas, setZonesCanvas] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [recording, setRecording] = useState(false);
  const [framerate, setFramerate] = useState(2);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    if (status.kafka === "disconnected") history.push("/photo");
  }, [status]);

  useEffect(() => {
    setFrame();
  }, [prediction, image]);

  const videoRef = useCallback(
    (node) => {
      setVideo(node);
      if (node) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then((stream) => (node.srcObject = stream));
      }
    },
    [facingMode]
  );

  const captureCanvasRef = useCallback((node) => {
    setCaptureCanvas(node);
  }, []);

  const imageCanvasRef = useCallback((node) => {
    setImageCanvas(node);
  }, []);

  const zonesCanvasRef = useCallback((node) => {
    setZonesCanvas(node);
  }, []);

  function captureFrame() {
    captureCanvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    let imageData = captureCanvas.toDataURL("image/jpeg");
    const base64data = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    const d = new Date();
    sendImage(base64data, user?.id, d.toISOString(), d.getTime());
  }

  function setFrame() {
    if (!imageCanvas || !image) {
      return;
    }

    let imageObj = new Image();
    imageObj.onload = function () {
      const ctx = imageCanvas.getContext("2d");
      ctx.drawImage(this, 0, 0, imageCanvas.width, imageCanvas.height);
      updateZonesCanvas();
      drawDetections();
    };

    imageObj.src = `data:image/jpeg;base64,${image}`;
  }

  function drawDetections() {
    if (!imageCanvas.getContext) {
      return;
    }

    if (prediction) {
      prediction.detections.filter((d) => d.score > minScore).forEach((d) => drawDetection(d));
    }
  }

  function updateZonesCanvas() {
    zonesCanvas.width = imageCanvas.width;
    zonesCanvas.height = imageCanvas.height;

    const ctx = zonesCanvas.getContext("2d");

    ctx.fillStyle = "#565656";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, zonesCanvas.width, zonesCanvas.height);
  }

  function drawDetection({ box, label, score }) {
    const drawScore = true;
    const textBgHeight = 14;
    const padding = 2;
    const letterWidth = 7.25;
    const scoreWidth = drawScore ? 4 * letterWidth : 0;
    const text = drawScore ? `${label} ${Math.floor(score * 100)}%` : label;

    const width = Math.floor((box.xMax - box.xMin) * imageCanvas.width);
    const height = Math.floor((box.yMax - box.yMin) * imageCanvas.height);
    const x = Math.floor(box.xMin * imageCanvas.width);
    const y = Math.floor(box.yMin * imageCanvas.height);
    const labelSetting = labelSettings[label];
    const labelWidth = label.length * letterWidth + scoreWidth + padding * 2;
    drawBox(x, y, width, height, labelSetting.bgColor);
    drawBoxTextBG(x, y + height - textBgHeight, labelWidth, textBgHeight, labelSetting.bgColor);
    drawBoxText(text, x + padding, y + height - padding);
    clearZone(x + 5, y + height - textBgHeight - 4, labelWidth, textBgHeight);
    clearZone(x, y, width, height);
  }

  function drawBox(x, y, width, height, color) {
    const ctx = imageCanvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
  }

  function drawBoxTextBG(x, y, width, height, color) {
    const ctx = imageCanvas.getContext("2d");

    // ctx.strokeStyle = getLabelSettings(label).color;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function drawBoxText(text, x, y) {
    const ctx = imageCanvas.getContext("2d");
    ctx.font = "12px Mono";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }

  function clearZone(x, y, width, height) {
    const ctx = zonesCanvas.getContext("2d");
    ctx.clearRect(x - 3, y - 6, width + 6, height + 6);
  }

  function startRecording() {
    if (intervalId) {
      return;
    }
    captureCanvas.width = video.videoWidth;
    captureCanvas.height = video.videoHeight;
    imageCanvas.width = captureCanvas.width;
    imageCanvas.height = captureCanvas.height;

    let x = setInterval(() => captureFrame(), Math.ceil(1000 / framerate));
    setIntervalId(x);
    setRecording(true);
  }

  function stopRecording() {
    clearInterval(intervalId);
    setIntervalId(null);
    setRecording(false);
  }

  function onFramerateChange(event, newValue) {
    console.log(newValue);
    setFramerate(newValue);
    if (recording) {
      clearInterval(intervalId);
      let x = setInterval(() => captureFrame(), 1000 / framerate);
      setIntervalId(x);
    }
  }

  function onFacingModeClicked() {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }

  function renderCamera() {
    const displayCamera = recording ? { display: "none" } : {};

    return (
      <div className="camera" style={displayCamera}>
        <div className="img-preview">
          <div className="img-container">
            <video
              className="camera-preview"
              ref={videoRef}
              controls={false}
              autoPlay
              playsInline
            />
            <div className="horizontal overlay">
              {/*<HorizontalCameraBorder className={"horizontal-camera-border-svg"} />*/}
            </div>
            <div className="vertical overlay">
              {/*<VerticalCameraBorder className={"vertical-camera-border-svg"} />*/}
            </div>
          </div>
        </div>
        <div className="left-button-container button-container">
          <Button
            variant="contained"
            size="large"
            className="choose-camera-button"
            onClick={onFacingModeClicked}
          >
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </div>
        <div className="center-button-container button-container">
          <Button
            variant="contained"
            size="large"
            className="start-recording-button"
            onClick={startRecording}
          >
            <FontAwesomeIcon icon={faCircle} />
          </Button>
        </div>
        <div className="right-button-container button-container">
          <Link to={"/photo"}>
            <Button
              variant="contained"
              size="large"
              className="choose-camera-button"
              onClick={onFacingModeClicked}
            >
              <FontAwesomeIcon icon={faVideo} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  function renderObjectDetection() {
    const displayResult = recording ? {} : { display: "none" };

    return (
      <div className="object-detection" style={displayResult}>
        <div className="img-preview">
          <div className="img-container">
            <canvas className="image-canvas" ref={imageCanvasRef} />
            <div className="zones overlay">
              <canvas className="zones-canvas" ref={zonesCanvasRef} />
            </div>
          </div>
        </div>
        <div className="left-button-container button-container"></div>
        <div className="center-button-container button-container">
          <Button
            variant="contained"
            size="large"
            className="stop-recording-button"
            onClick={stopRecording}
          >
            <FontAwesomeIcon className="stop-icon" icon={faStop} />
          </Button>
        </div>
        <div className="right-button-container button-container"></div>
      </div>
    );
  }

  function renderCaptureCanvas() {
    return (
      <div className="capture" style={{ display: "none" }}>
        <canvas className="capture-canvas" ref={captureCanvasRef} />
      </div>
    );
  }

  return (
    <div className="video">
      {renderCamera()}
      {renderObjectDetection()}
      {renderCaptureCanvas()}
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.appReducer, ...state.videoReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => {
      dispatch(resetVideo());
    },
    sendImage: (image, userId, date, time) => {
      dispatch(sendImage(image, userId, date, time));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
