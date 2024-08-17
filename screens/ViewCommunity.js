import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FooterMenu from '../components/Menus/FooterMenu'

const ViewCommunity = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <FooterMenu />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 40,
    },
    container2: {
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default ViewCommunity