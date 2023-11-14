import { Camera } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CModal from '../../components/common/CModal';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import ProfileImage from '../../components/contact/ProfileImage';
import ProfileCellInfo from '../../components/setting/ProfileCellInfo';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { setThemeColorAction } from '../../store/sliceTheme';
import { changeUserInfoAction, logoutAction } from '../../store/sliceUser';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import invertColor from '../../utils/invertColor';
import selectMedia from '../../utils/selectMedia';
import toast from '../../utils/toast';

const RightChild = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme as ITheme);
  const [show, setShow] = useState(false);
  const [themeColor, setThemeColor] = useState(theme.themeColor);

  const handlePress = () => {
    setShow(true);
  };
  const handleChangeColor = (color: string) => {
    console.log(color, 'colorChange');
    setThemeColor(color);
  };
  const handleConfirm = () => {
    dispatch(setThemeColorAction(themeColor));
  };
  const handleCancel = () => {
    setShow(false);
    setThemeColor(theme.themeColor);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          width: 25,
          height: 25,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: invertColor(theme.themeColor),
          backgroundColor: theme.themeColor,
        }}
      />

      <CModal
        show={show}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}>
        <View
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => e.stopPropagation()}
          style={{ paddingHorizontal: 40, height: 300, paddingVertical: 20 }}>
          <ColorPicker
            color={themeColor}
            thumbSize={20}
            sliderSize={20}
            swatches={false}
            gapSize={10}
            onColorChangeComplete={handleChangeColor}
          />
        </View>
      </CModal>
    </View>
  );
};

const Setting = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { control, setControl } = useControl();
  const dispatch = useDispatch();

  const infoOptions = [
    { label: 'username' },
    { label: 'mobile' },
    { label: 'nickname', to: 'SettingDetail' },
    { label: 'describe', to: 'SettingDetail', defaultValue: '-' },
    { label: 'Change Password', to: 'ChangePassword' },
  ];

  const handleLogout = () => {
    if (!control.isConfirm) {
      setControl(prev => ({ ...prev, isConfirm: true }));
      return;
    }
    try {
      setControl(prev => ({ ...prev, isConfirm: false }));
      dispatch(logoutAction());
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.error(error, 'errLogout');
    } finally {
      setControl(prev => ({ ...prev, isConfirm: true }));
    }
  };
  const handleSelectImage = async () => {
    if (control.isBlock) return;
    setControl(prev => ({ ...prev, isBlock: true }));

    const randomNumber = `${Math.floor(Math.random() * 100000)}`.padStart(
      5,
      '0',
    );

    try {
      const res = await selectMedia({
        options: { allowsMultipleSelection: false, selectionLimit: 1 },
        filename: `avatar/${randomNumber}`,
      });
      const avatar = res?.[0]?.uri;
      if (!avatar) return;
      const updateRes = await userApi.updateUserInfo({ avatar });
      if (!updateRes) return;
      dispatch(changeUserInfoAction({ k: 'avatar', v: avatar }));
      toast('Profile Image Updated!');
    } catch (error) {
      console.error(error, 'errSelectImage');
    } finally {
      setControl(prev => ({ ...prev, isBlock: false }));
    }
  };

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader
        bgColor={control.isConfirm ? 'rgba(0,0,0,0.3)' : undefined}
      />
      <Header
        navigation={navigation}
        title="Profile"
        RightChild={() => <RightChild />}
      />
      <View
        style={{
          flex: 1,
          margin: 15,
          marginTop: 40,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 15,
          alignItems: 'center',
        }}>
        {/* avatar  */}
        <TouchableOpacity
          onPress={handleSelectImage}
          style={{ position: 'relative', marginBottom: 40 }}>
          <ProfileImage avatar={user?.avatar} dim={80} />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: 9999,
              backgroundColor: theme.themeColor,
              padding: 3,
            }}>
            <Camera size={24} color={invertColor(theme.themeColor)} />
          </View>
        </TouchableOpacity>
        {/* username mobile describe nickname */}
        <View
          style={{
            rowGap: 20,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
          {infoOptions.map(item => (
            <ProfileCellInfo
              key={item.label}
              {...item}
              navigation={navigation}
            />
          ))}

          <CButton handlePress={handleLogout} text="Logout" margin={0} />
        </View>
      </View>
      <Footer navigation={navigation} selected={2} />
      <CModal
        show={control.isConfirm}
        handleCancel={() => setControl({ ...control, isConfirm: false })}
        handleConfirm={handleLogout}>
        <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 16 }}>
          Confirm Logout?
        </Text>
      </CModal>
      {control.isBlock && <Loading />}
    </View>
  );
};

export default Setting;
