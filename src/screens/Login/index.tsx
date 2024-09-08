import React, {FC, useEffect, useState} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {Button} from '../../components/Elements';
import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import themedStyles from './styles';
import appLogo from '../../assets/images/applogo.png';

const ErrorMessage: FC<{errorMessage: string}> = ({errorMessage}) => {
  const styles = useTheme(themedStyles);

  if (!errorMessage) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

const LoginScreen = () => {
  const styles = useTheme(themedStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {signIn, signUp, account, error} = useAccount();
  const [isNavigating, setIsNavigating] = useState(false);

  const onSubmit = async () => {
    if (email && password) {
      await signIn(email, password);
    }
  };

  const onRegister = async () => {
    const username = email;
    if (email && password) {
      await signUp(email, password, username);
    }
  };

  useEffect(() => {
    if (!!account?.jwt && !isNavigating) {
      setIsNavigating(true);
      navigation.navigate(Routes.Tabs as never);
    }
  }, [account, isNavigating, navigation]);

  const isButtonDisabled = !email || !password;
  const errorMessage = error.includes('Invalid identifier or password')
    ? 'Invalid username or password.'
    : '';

  return (
    <View style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Image source={appLogo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, errorMessage ? styles.inputError : null]}
        placeholderTextColor={styles.placeholderTextColor}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        style={[styles.input, errorMessage ? styles.inputError : null]}
        placeholderTextColor={styles.placeholderTextColor}
      />

      <ErrorMessage errorMessage={errorMessage} />

      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Sign in"
          disabled={isButtonDisabled}
        />
        <Button
          onPress={onRegister}
          title="Sign up"
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
