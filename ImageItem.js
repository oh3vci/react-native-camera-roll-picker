import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const checkIcon = require('./circle-check.png');
const checkedIcon = require('./checked.png');
const uncheckedIcon = require('./unchecked.png');

const styles = StyleSheet.create({
    marker: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'transparent',
    },
});

class ImageItem extends Component {
    UNSAFE_componentWillMount() {
        let { width } = Dimensions.get('window');
        const { imageMargin, imagesPerRow, containerWidth } = this.props;

        if (typeof containerWidth !== 'undefined') {
            width = containerWidth;
        }
        this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
    }

    handleClick(item) {
        this.props.onClick(item);
    }

    render() {
        const {
            item, selected, selectedNum, selectedMarker, imageMargin,
        } = this.props;

        const markerSize = parseInt(this.imageSize * 0.28);
        const fontSize = parseInt(markerSize * 0.48);

        const checkedMarker = (
            <View
                style={[styles.marker, { width: markerSize, height: markerSize, flex: 1, justifyContent: 'center', alignItems: 'center' }]}
            >
                <Image
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'transparent',
                        width: markerSize,
                        height: markerSize
                    }}
                    source={checkedIcon}
                />
                <Text
                    style={{
                        color: '#ffffff',
                        fontSize,
                        fontWeight: 'bold',
                    }}
                >
                    {selectedNum}
                </Text>
            </View>
        );

        const marker = selectedMarker || selected
            ? checkedMarker
            : (<Image
                style={[styles.marker, { width: markerSize, height: markerSize }]}
                source={uncheckedIcon}
            />);

        const { image } = item.node;

        return (
            <TouchableOpacity
                style={{ marginBottom: imageMargin, marginRight: imageMargin }}
                onPress={() => this.handleClick(image)}
            >
                <Image
                    source={{ uri: image.uri }}
                    style={{ height: this.imageSize, width: this.imageSize }}
                />
                {marker}
            </TouchableOpacity>
        );
    }
}

ImageItem.defaultProps = {
    item: {},
    selected: false,
};

ImageItem.propTypes = {
    item: PropTypes.object,
    selected: PropTypes.bool,
    selectedNum: PropTypes.number,
    selectedMarker: PropTypes.element,
    imageMargin: PropTypes.number,
    imagesPerRow: PropTypes.number,
    onClick: PropTypes.func,
};

export default ImageItem;
