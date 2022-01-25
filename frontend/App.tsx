import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function App(): JSX.Element {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const signTransaction = React.useCallback(async () => {
    try {
      console.log("signing");
      const signature = await connector.signPersonalMessage([
        "Welcome T'Challa!",
        connector.accounts[0].toLowerCase(),
      ]);
      console.log("signed");
      console.log(signature);
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Button onPress={signTransaction} title="Sign Message" />

          <Button
            color={"#ff0000"}
            onPress={killSession}
            title="Kill Session"
          />
        </View>
      )}
    </View>
  );
}
