import { NativeScrollEvent } from 'react-native';

const isCloseToBottom = ({
  layoutMeasurement, // the size of the layout of the ScrollView or FlatList
  contentOffset, // the distance from the top of the ScrollView or FlatList to the current scroll position
  contentSize, // total size of the content inside the ScrollView or FlatList
}: NativeScrollEvent) => {
  const paddingToBottom = 50;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default isCloseToBottom;
