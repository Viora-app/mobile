import React from 'react';
import {View, Text, Image} from 'react-native';
import {NETWORK_NAME} from '@env';

import {Themes} from '../../context/presetsContext/types';
import {fonts} from '../../config/stylesGuides';
import lightCarrot from '../../assets/images/lightcarrot.png';
import darkCarrot from '../../assets/images/darkcarrot.png';
import {usePresets} from '../../hooks/usePresets';
import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import themedStyles from './styles';
import type {WalletProps} from './types';

const carrots = {
  [Themes.light]: lightCarrot,
  [Themes.dark]: darkCarrot,
};

const Wallet = ({style}: WalletProps) => {
  const styles = useTheme(themedStyles);
  const {presets} = usePresets();
  const {account} = useAccount();

  const fullName = [account?.first_name, account?.last_name]
    .filter(item => !!item)
    .join(' ');

  return (
    <View style={[styles.walletWrapper, style]}>
      <Image source={carrots[presets.theme]} />
      <View style={styles.walletInfo}>
        {fullName.length ? (
          <View style={styles.walletContainer}>
            <Text style={[fonts.h2, styles.address]}>{fullName}</Text>
          </View>
        ) : null}
        <View style={styles.walletContainer}>
          <Text style={[fonts.base, styles.label]}>Points</Text>
          <Text style={[fonts.h1, styles.points]}>{account?.points ?? 0}</Text>
        </View>
        <View style={styles.walletContainer}>
          <Text style={[fonts.base, styles.label]}>{`${
            NETWORK_NAME || ''
          } Wallet Address`}</Text>
          <Text style={[fonts.h3, styles.balance, styles.address]}>
            {account?.address ?? 'Loading'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;
