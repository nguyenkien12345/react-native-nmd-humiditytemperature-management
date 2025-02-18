import { StatusBar } from "expo-status-bar";
import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: createRef(),
}));

const WIDTH_OF_SCREEN = Dimensions.get("window").width;
const HEIGHT_OF_SCREEN = Dimensions.get("window").height;

const TabList = ({ tabs, scrollX, onItemPress }) => {
  if (tabs && tabs.length > 0) {
    const [measures, setMeasures] = useState([]);

    const containerRef = useRef();

    // Đo lường vị trí và kích thước của từng tab so với containerRef (tham chiếu đến View chứa các tab).
    useEffect(() => {
      const m = [];

      tabs.forEach((item) => {
        // item.ref.current.measureLayout được sử dụng để đo lường vị trí và kích thước của tab hiện tại so với containerRef.
        item.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            m.push({
              x,
              y,
              width,
              height,
            });

            // Khi tất cả các tab đã được đo lường => Do something
            if (m.length === tabs.length) {
              setMeasures(m);
            }
          }
        );
      });
    }, []);

    return (
      <View style={{ position: "absolute", top: 100, width: WIDTH_OF_SCREEN }}>
        <View ref={containerRef} style={styles.tabList}>
          {tabs.map((tab, index) => {
            return (
              <TabItem
                key={tab.key}
                tab={tab}
                ref={tab.ref}
                onItemPress={() => onItemPress(index)}
              />
            );
          })}
        </View>

        {measures.length > 0 && (
          <Indicator measures={measures} scrollX={scrollX} />
        )}
      </View>
    );
  }
};

const TabItem = forwardRef(({ tab, onItemPress }, ref) => {
  if (tab) {
    return (
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref}>
          <Text
            style={{
              fontSize: 84 / data.length,
              fontWeight: "800",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {tab?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

const Indicator = ({ measures, scrollX }) => {
  // Mảng chứa các giá trị đại diện cho vị trí cuộn của FlatList. Mỗi phần tử trong mảng tương ứng với vị trí cuộn của một tab.
  const inputRange = data.map((_, i) => i * WIDTH_OF_SCREEN);

  // Là chiều rộng của thanh chỉ báo, được tính toán dựa trên vị trí cuộn hiện tại (scrollX).
  // Nó sử dụng interpolate để ánh xạ giá trị cuộn (scrollX) vào chiều rộng tương ứng của từng tab.
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  // Là vị trí ngang của thanh chỉ báo, được tính toán dựa trên vị trí cuộn hiện tại (scrollX).
  // Nó sử dụng interpolate để ánh xạ giá trị cuộn (scrollX) vào vị trí ngang tương ứng của từng tab.
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        left: 0,
        bottom: -10,
        transform: [{ translateX: translateX }],
        backgroundColor: "white",
      }}
    />
  );
};

function TabViews() {
  const ref = useRef();

  const scrollX = useRef(new Animated.Value(0)).current;

  // itemIndex là chỉ số của tab được nhấn (ví dụ: 0, 1, 2, ...).
  // scrollToOffset là một phương thức của FlatList giúp cuộn danh sách đến một vị trí cụ thể dựa trên offset.
  // Nếu người dùng nhấn vào tab thứ 2 (itemIndex = 1), offset sẽ là 1 * WIDTH_OF_SCREEN, và FlatList sẽ cuộn đến vị trí của tab thứ 2.
  const onItemPress = useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * WIDTH_OF_SCREEN,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.FlatList
        ref={ref}
        data={data} // data: là một mảng chứa các object
        keyExtractor={(item) => item.key} // key: là định danh duy nhất cho mỗi item trong danh sách
        horizontal // Hiển thị danh sách theo chiều ngang (horizontal)
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (scroll indicator)
        pagingEnabled // Kích hoạt chế độ cuộn từng trang (paging). Khi người dùng cuộn, danh sách sẽ dừng lại ở từng item một thay vì cuộn tự do
        bounces={false} // Vô hiệu hóa hiệu ứng "bounce" (nảy) khi cuộn đến cuối danh sách
        numColumns={1} // Số cột hiển thị (mặc định là 1)
        onScroll={Animated.event(
          // Cập nhật scrollX khi người dùng cuộn, cho phép tạo các hiệu ứng animation dựa trên vị trí cuộn.
          // x: Giá trị cuộn theo trục ngang (horizontal). Nếu bạn cuộn dọc, bạn có thể sử dụng y thay vì x.
          // scrollX: Đây là một Animated.Value sẽ được cập nhật mỗi khi người dùng cuộn.
          // contentOffset: Vị trí cuộn hiện tại của danh sách.
          // useNativeDriver: false có nghĩa là animation sẽ chạy trên JavaScript thread. Nếu bạn đặt useNativeDriver: true, animation sẽ chạy trên native thread
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width: WIDTH_OF_SCREEN, height: HEIGHT_OF_SCREEN }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1, resizeMode: "cover" }}
              />

              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                ]}
              ></View>
            </View>
          );
        }}
      />

      <TabList tabs={data} scrollX={scrollX} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default TabViews;

// Các thuộc tính khác của Animated.FlatList
// - ListEmptyComponent={() => <Text>Data rỗng</Text>} // Component hiển thị khi danh sách trống (data rỗng)
// - ListHeaderComponent={() => <Text>Header</Text>} // Component hiển thị ở đầu danh sách
// - ListFooterComponent={() => <Text>Footer</Text>} // Component hiển thị ở cuối danh sách
// - ItemSeparatorComponent={() => <></>} // Component hiển thị giữa các item.

// + Thuộc tính hiệu suất:
// - initialNumToRender={10} // Số lượng item được render ban đầu (mặc định là 10).
// - windowSize={10} // Số lượng item được giữ trong bộ nhớ (mặc định là 21).
// - maxToRenderPerBatch={10} // Số lượng item được render trong mỗi batch (mặc định là 10).

// + Thuộc tính điều khiển cuộn:
// - onScroll: Hàm được gọi khi người dùng cuộn danh sách.
// - scrollEventThrottle: Tần suất (ms) gọi hàm onScroll (mặc định là 50ms).
// - onEndReached: Hàm được gọi khi người dùng cuộn đến cuối danh sách.
// - onEndReachedThreshold: Khoảng cách từ cuối danh sách để kích hoạt onEndReached (tính bằng tỷ lệ, ví dụ: 0.5).

// + Thuộc tính animation:
// - onScroll với Animated.event: Cho phép bạn tạo các hiệu ứng animation dựa trên sự kiện cuộn.
// - scrollToIndex: Cuộn đến một item cụ thể bằng index.
// - scrollToOffset: Cuộn đến một vị trí cụ thể trong danh sách.

// StyleSheet.absoluteFillObject =>  Đây là một helper từ StyleSheet tự động tạo các style sau:
// position: 'absolute',
// top: 0,
// left: 0,
// right: 0,
// bottom: 0,
// => Làm cho View chiếm toàn bộ không gian của parent component mà nó được đặt bên trong. Nó "lấp đầy" (fill) tuyệt đối (absolute) parent.
// Điều này rất quan trọng cho lớp phủ, vì chúng ta muốn nó che phủ toàn bộ màn hình hoặc một phần màn hình.

// Lý thuyết về interpolate
// + interpolate là một phương thức của Animated.Value trong React Native, giúp ánh xạ một giá trị từ một khoảng (inputRange) sang một khoảng khác (outputRange).
// Nó thường được sử dụng để tạo các hiệu ứng animation dựa trên giá trị thay đổi liên tục (như vị trí cuộn).

// + Hàm interpolate nhận vào hai tham số chính:
// - inputRange: Một mảng các giá trị đại diện cho khoảng đầu vào.
// - outputRange: Một mảng các giá trị đại diện cho khoảng đầu ra.
// => Khi giá trị của Animated.Value thay đổi trong inputRange, interpolate sẽ ánh xạ giá trị đó sang outputRange tương ứng.

// VÍ DỤ:
// const opacity = scrollX.interpolate({
//   inputRange: [0, 100],
//   outputRange: [0, 1],
// })

// - Khi scrollX = 0, opacity = 0.
// - Khi scrollX = 50, opacity = 0.5.
// - Khi scrollX = 100, opacity = 1.
