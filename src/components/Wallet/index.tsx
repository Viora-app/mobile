import React from 'react';
import {View, Text, Image} from 'react-native';

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
    <View style={[styles.wrapper, style]}>
      <Image source={carrots[presets.theme]} />
      <View style={styles.info}>
        <View style={styles.balanceContainer}>
          <Text style={[fonts.base, styles.label]}>Points:</Text>
          <Text style={[fonts.h1, styles.balance]}>{account?.points ?? 0}</Text>
        </View>
        {fullName.length ? (
          <View style={styles.addressContainer}>
            <Text style={[fonts.base, styles.label]}>Name:</Text>
            <Text style={[fonts.h3, styles.address]}>{fullName}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Wallet;
