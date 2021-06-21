import React, { Component } from "react";
import { Animated, View, Image, StyleSheet } from "react-native";

export class Ima extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
    };
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
      useNativeDriver: true,
    }).start();
    !!this.props.onLoadThumbnail && this.props.onLoadThumbnail();
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
      useNativeDriver: true,
    }).start();
    !!this.props.onLoadImage && this.props.onLoadImage();
  }

  render() {
    return (
      <View style={this.props.style}>
        <Image
          resizeMode="cover"
          style={[styles.image, this.props.style]}
          source={this.props.placeHolderSource}
        />
        <Animated.Image
          resizeMode="cover"
          style={[
            styles.image,
            { opacity: this.state.thumbnailOpacity },
            this.props.style,
          ]}
          source={this.props.thumbnailSource}
          onLoad={() => this.onLoadThumbnail()}
          blurRadius={this.props.thumbnailBlurRadius}
        />
        <Animated.Image
          resizeMode="cover"
          style={[
            styles.image,
            { opacity: this.state.imageOpacity },
            this.props.style,
          ]}
          source={this.props.imageSource}
          onLoad={() => this.onLoadImage()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
