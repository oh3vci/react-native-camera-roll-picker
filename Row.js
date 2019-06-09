import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import ImageItem from './ImageItem';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
    },
});

class Row extends PureComponent {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
    }

    renderImage(item, isSelected) {
        const {
            imageMargin,
            selectedItem,
            selectedMarker,
            imagesPerRow,
            containerWidth,
        } = this.props;

        const { uri } = item.node.image;
        const selectedNum = selectedItem.findIndex(select => select.uri === uri) + 1;

        return (
            <ImageItem
                key={uri}
                item={item}
                selected={isSelected}
                selectedNum={selectedNum}
                imageMargin={imageMargin}
                selectedMarker={selectedMarker}
                imagesPerRow={imagesPerRow}
                containerWidth={containerWidth}
                onClick={this.props.selectImage}
            />
        );
    }

    render() {
        const items = this.props.rowData.map((item, index) => {
            if (item === null) {
                return null;
            }
            return this.renderImage(item, this.props.isSelected[index]);
        });

        return (
            <View style={styles.row}>
                {items}
            </View>
        );
    }
}

Row.propTypes = {
    rowData: PropTypes.array.isRequired,
    isSelected: PropTypes.array.isRequired,
    selectImage: PropTypes.func.isRequired,
    selectedItem: PropTypes.array,
};

export default Row;
