/* eslint-disable react-native/no-inline-styles */
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function App(): JSX.Element {
  const connector = useWalletConnect();

  const [signature, setSignature] = useState();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const signTransaction = React.useCallback(async () => {
    try {
      console.log("signing");
      const sign = await connector.signPersonalMessage([
        "Welcome T'Challa!",
        connector.accounts[0].toLowerCase(),
      ]);
      console.log("signed");
      console.log(sign);
      setSignature(sign);
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: 30,
      }}
    >
      {!connector.connected && (
        <Button
          onPress={connectWallet}
          title="Connect a Wallet"
          color={"#bf2139"}
        />
      )}
      {!!connector.connected && (
        <>
          <Button onPress={signTransaction} title="Sign Message" />
          <Button
            color={"#ff0000"}
            onPress={killSession}
            title="Kill Session"
          />
          {signature ? (
            <Text style={{ alignSelf: "flex-end", marginTop: "auto" }}>
              Signature: {signature}
            </Text>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
}
