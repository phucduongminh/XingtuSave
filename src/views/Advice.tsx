import { Text, StyleSheet, View } from "react-native";

const Advice = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TODO: Next Sprint</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
    },
    text: {
        fontSize:25,
    }
});

export default Advice;
