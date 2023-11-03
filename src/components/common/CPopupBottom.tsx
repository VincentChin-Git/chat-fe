import { X } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CPopup from './CPopup';
import { commonStyles } from '../../constants/styles';

const CPopupBottom = ({
  show,
  title = '',
  handleClose = () => {},
  children = <></>,
}: {
  show: boolean;
  title: string;
  children: React.JSX.Element;
  handleClose?: () => void;
}) => {
  return (
    <CPopup show={show} position="bottom" handleClose={handleClose}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
          padding: 15,
        }}>
        {/* title bar */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 10,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          {/* blank  */}
          <TouchableOpacity
            style={{
              width: '20%',
              paddingVertical: 10,
              height: 1,
            }}></TouchableOpacity>

          {/* title  */}
          <Text
            style={{
              ...commonStyles.subtitleStyles,
              flex: 1,
              textAlign: 'center',
            }}>
            {title}
          </Text>

          {/* close icon  */}
          <TouchableOpacity
            style={{
              width: '20%',
              paddingVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            onPress={handleClose}>
            <X size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View>{children}</View>
      </View>
    </CPopup>
  );
};

export default CPopupBottom;
