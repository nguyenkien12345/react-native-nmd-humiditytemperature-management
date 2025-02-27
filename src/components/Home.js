import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AirImage from "../../assets/images/Air.jpg";
import DustImage from "../../assets/images/Dust.jpg";
import HumidityImage from "../../assets/images/Humidity.jpg";
import TemperatureImage from "../../assets/images/Temperature.jpg";

const WIDTH_OF_SCREEN = Dimensions.get("window").width;
const HEIGHT_OF_SCREEN = Dimensions.get("window").height;

function Home() {
  const navigation = useNavigation();
  // Kiểm tra xem màn hình này có hỗ trợ quay về màn hình trước đó không
  const canBackToScreen = navigation.canGoBack();

  const route = useRoute();

  const [slideActive, setSlideActive] = useState(0);

  const images = [AirImage, DustImage, HumidityImage, TemperatureImage];

  const contents = [
    "Quản lý bụi mịn",
    "Quản lý độ ẩm",
    "Quản lý nhiệt độ",
    "Quản lý không khí",
  ];

  const showImages = images.map((item, index) => (
    <Image
      key={index}
      style={styles.wrapper}
      resizeMode="stretch"
      source={item}
    />
  ));

  const showDots = images.map((item, index) => (
    <Text
      key={index}
      style={
        index === slideActive
          ? [styles.dot, { color: "red" }]
          : [styles.dot, { color: "white" }]
      }
    >
      ⬤
    </Text>
  ));

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== slideActive) {
        setSlideActive(slide);
      }
        if (slideActive === 3) {
          setTimeout(() => {
            navigation.navigate("List");
          }, 1000);
        }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={styles.wrapper}
        >
          {showImages}
        </ScrollView>

        <View style={styles.dots}>{showDots}</View>
      </View>

      <Text style={styles.title}>{contents[slideActive]}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  wrapper: {
    width: WIDTH_OF_SCREEN,
    height: HEIGHT_OF_SCREEN * 0.75,
  },
  dots: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 500,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 50,
    textShadowColor: "grey",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
});

export default Home;
