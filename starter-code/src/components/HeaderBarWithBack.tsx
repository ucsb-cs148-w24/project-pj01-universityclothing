import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";

const HeaderBarWithBack = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>{"Back"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.darkBlue,
        height: 50,
    },
    backButton: {
        color: COLORS.yellow,
        fontSize: 20,
        marginLeft: 10,
    },
    headerText: {
        color: COLORS.yellow,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default HeaderBarWithBack;
