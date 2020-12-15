import { useAppContext } from "engines";
import React from "react";
// import { ScrollView } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";

export function GalleryScreen(props) {
  const imageUrls = React.useMemo(() => props.route.params.images, [
    props.route.params,
  ]);
  const imageIndex = React.useMemo(() => props.route.params.imgIndex, [
    props.route.params,
  ]);
  const { C } = useAppContext();

  return (
    <ImageViewer
      imageUrls={imageUrls}
      index={imageIndex}
      useNativeDriver={true}
      backgroundColor={C.background01}
    />
  );
}

// const images = [
//   {
//     url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
//   },
//   {
//     url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
//   },
//   {
//     url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
//   },
//   {
//     url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
//   },
// ];
