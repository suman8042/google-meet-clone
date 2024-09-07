import { useEffect, useReducer, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/apiRequests";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../../utils/apiEndpoints";
import {socket} from "../../../../app/socketManager";
import Peer from "peerjs";
import Webcam from "react-webcam";
import "./CallPage.css";

import Messenger from "../UI/Messenger/Messenger";
import MessageListReducer from "../../reducers/MessageListReducer";
import Alert from "../UI/Alert/Alert";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";

const CallPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = window.location.hash === "#init";
  const url = `${window.location.origin}${window.location.pathname}`;
  const alertTimeout = useRef(null);
  const webcamRef = useRef(null);
  const [peer, setPeer] = useState(null);
  const [messageList, messageListReducer] = useReducer(MessageListReducer, []);
  const [screenCastStream, setScreenCastStream] = useState(null);
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [dataChannelOpen, setDataChannelOpen] = useState(false);

  useEffect(() => {
    if (isAdmin) setMeetInfoPopup(true);
    initWebRTC();

    socket.on("code", (data) => {
      if (data.url === url && peer) peer.signal(data.code);
    });

    socket.on("chat-message", (data) => {
      if (data.url === url) handleIncomingMessage(data.msg);
    });

    return () => {
      socket.off("code");
      socket.off("chat-message");
      if (peer) peer.destroy();
    };
  }, [peer]);

  const getReceiverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) peer.signal(response.code);
  };

  const initWebRTC = () => {
    const stream = webcamRef.current?.stream;
    if (!stream) return console.error("No webcam stream available");

    const peerJs = new Peer(isAdmin ? undefined : id, {
      host: "your-peerjs-server-host",
      port: 9000,
      path: "/myapp",
      secure: true,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "turn:your-turn-server-url", username: "user", credential: "pass" },
        ],
      },
    });

    setPeer(peerJs);

    if (!isAdmin) getReceiverCode();

    peerJs.on("open", (id) => console.log("PeerJS connection opened with ID:", id));
    peerJs.on("signal", (data) => {
      if (isAdmin) {
        const payload = { id, signalData: data };
        postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
      } else {
        socket.emit("code", { code: data, url });
      }
    });

    peerJs.on("connection", (conn) => {
      conn.on("data", (data) => handleIncomingMessage(data.toString()));
      conn.on("open", () => setDataChannelOpen(true));
      conn.on("close", () => setDataChannelOpen(false));
    });

    peerJs.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        // Handle remote stream if needed
      });
    });

    peerJs.on("error", (error) => console.error("PeerJS error:", error));
  };

  const handleIncomingMessage = (message) => {
    clearTimeout(alertTimeout.current);
    messageListReducer({ type: "addMessage", payload: { user: "other", msg: message, time: Date.now() } });

    setMessageAlert({
      alert: true,
      isPopup: true,
      payload: { user: "other", msg: message },
    });

    alertTimeout.current = setTimeout(() => {
      setMessageAlert({ ...messageAlert, isPopup: false, payload: {} });
    }, 10000);
  };

  const sendMsg = (msg) => {
    if (peer && dataChannelOpen) {
      peer.send(msg);
    } else {
      socket.emit("chat-message", { msg, url });
    }

    messageListReducer({
      type: "addMessage",
      payload: { user: "you", msg, time: Date.now() },
    });
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        if (peer && webcamRef.current?.stream) {
          peer.replaceTrack(
            webcamRef.current.stream.getVideoTracks()[0],
            screenStream.getVideoTracks()[0],
            webcamRef.current.stream
          );
          setScreenCastStream(screenStream);
          screenStream.getTracks()[0].onended = stopScreenShare;
          setIsPresenting(true);
        }
      })
      .catch((error) => console.error("Error starting screen share:", error));
  };

  const stopScreenShare = () => {
    if (screenCastStream && peer && webcamRef.current?.stream) {
      screenCastStream.getTracks().forEach((track) => track.stop());
      peer.replaceTrack(
        screenCastStream.getVideoTracks()[0],
        webcamRef.current.stream.getVideoTracks()[0],
        webcamRef.current.stream
      );
      setIsPresenting(false);
    }
  };

  const toggleAudio = (value) => {
    const stream = webcamRef.current?.stream;
    if (stream) {
      stream.getAudioTracks()[0].enabled = value;
      setIsAudio(value);
    }
  };

  const disconnectCall = () => {
    if (peer) peer.destroy();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="callpage-container">
      <Webcam
        ref={webcamRef}
        audio={true}
        videoConstraints={{ facingMode: "user" }}
        className="video-container"
      />

      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
      />

      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default CallPage;
