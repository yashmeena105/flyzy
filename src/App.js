import "./App.scss";
import Routes from "./routing";
import { Provider } from "react-redux";
import { persistor, store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import { getNotifToken, onMessageListener } from "Config/firebase";
import { notification } from "antd";
import { MessageOutlined } from "@ant-design/icons"

import useSound from "use-sound";
import notificationTone from "Assets/tones/notification.mp3";


function App() {

  const [api, contextHolder] = notification.useNotification();
  const [playNotificationTone] = useSound(notificationTone);

  useEffect(() => {
    playNotificationTone();
  }, [])



  const [isTokenFound, setTokenFound] = useState(false);
  getNotifToken(setTokenFound);
  onMessageListener().then(payload => {
    console.log("Notification received", payload);
    playNotificationTone();
    api.open({
      message: payload.notification.title,
      description:
        payload.notification.body,
      icon: (
        <MessageOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  }).catch(err => console.log('failed: ', err));


  return (
    <Provider store={store}>
      {contextHolder}
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
