import { View, Text, FlatList } from 'react-native'
import VideoThumbnail from '../HomeScreen/VideoThumbnail'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
export default function UserPostList({postList,GetPostUser,loading}) {
    const BottomMargin=useBottomTabBarHeight()
  return (
    <View style={{}}>
      <FlatList
          data={postList}
          renderItem={({ item, index }) => (
            <VideoThumbnail item={item} key={item?.id} />
          )}
          numColumns={2}
          onRefresh={GetPostUser}
          refreshing={loading}
       
        />
    </View>
  )
}