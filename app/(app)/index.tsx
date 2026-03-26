import { FlatList, StatusBar,SafeAreaView } from "react-native";
import { useRef, useState } from "react";
import VideoItem, { SCREEN_HEIGHT } from "@/components/video-item";
import { usePostsQuery } from "@/action/posts";
import { Loading } from "@/components/post/loading";
import { NotFound } from "@/components/post/notfound";

export default function HomeScreen() {
  const [currentVisible, setCurrentVisible] = useState<string | null>(null);
  const { data, isLoading, isError } = usePostsQuery();
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentVisible(viewableItems[0].item?._id);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 80});
  if (isLoading) {
    return <Loading />;
  }

  // Handle error or no post found
  if (isError) {
    return <NotFound />;
  }
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <FlatList
        data={data?.data?.data}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <VideoItem
            post={item}
            isVisible={currentVisible === item?._id}
            key={item?._id}
          />
        )}
        pagingEnabled // swipe one screen at a time
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT} // ensures snapping per screen
        decelerationRate="fast" // smooth snap
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </SafeAreaView>
  );
}
