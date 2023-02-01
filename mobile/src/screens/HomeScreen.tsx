import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SideMenu from '../components/SideMenu';
import { useState } from "react"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {

    const [sideMenu, showSideMenu] = useState(false)
    const handleSideMenu = () => {
        showSideMenu(!sideMenu)
    }

    const handleNothing = () => {
        return
    }

    return (
        <View style={styles.container}>
            { sideMenu && <SideMenu /> }

            <View style={ styles.belowSideMenuContainer }>
                <View style={ styles.map }>
                    <TouchableOpacity onPress={handleSideMenu} style={ styles.menuButton }><FontAwesome name="bars" size={30} color="#781055"/></TouchableOpacity>
                    <TouchableOpacity onPress={sideMenu ? handleSideMenu : () => {}} style={ styles.gpsButton }><MaterialIcons name="gps-fixed" size={18} color="#781055"/></TouchableOpacity>
                </View>

                <View style={ styles.main }>
                    <View style={ styles.overDivider }>
                        <View style={ styles.searchRow }>
                            <View style={ styles.searchBox }>
                                <FontAwesome name="search" size={24} color="#929292" />
                                <Text style={ styles.searchPlaceholder }>Toque para buscar um bloco</Text>
                            </View>
                            <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={24} color="#781055"/></TouchableOpacity>
                        </View>

                        <View style={ styles.textRow }>
                            <Text style={ styles.date }>fev 18, sábado</Text>
                        </View>
                    </View>

                    <View style={ styles.divider } />

                    <View style={ styles.underDivider }>
                        <MaterialCommunityIcons name="party-popper" size={100} color="#D9A0C6" />
                        <Text style={ styles.tip }>Use a barra de pesquisa para localizar e adicionar blocos à sua agenda</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#EDEDED",
        marginTop: Constants.statusBarHeight,
    },
    belowSideMenuContainer: {
        width: width,
        height: height,
    },
    map: {
        width: "100%",
        flex: 1.5,
        flexDirection: "column",
    },
    menuButton: {
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "#F1C4E2",
        alignSelf: "flex-start",
        position: "absolute",
        bottom: 20,
        left: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    gpsButton: {
        borderRadius: 50,
        width: 25,
        height: 25,
        backgroundColor: "#F1C4E2",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 20,
        right: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        backgroundColor: "#F1C4E2",
        width: "100%",
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    overDivider: {
        flex: 1,
    },
    divider: {
        backgroundColor: "#781055",
        height: 2
    },
    underDivider: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    searchRow: {
        flexDirection: "row",
        height: "60%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
    },
    searchBox: {
        backgroundColor: "white",
        height: "80%",
        width: "90%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 20
    },
    threeDots: {
        alignItems: "center",
        justifyContent: "center",
    },
    textRow: {
        height: "40%",
    },
    date: {
        fontFamily: "Roboto",
        color: "#781055",
        fontSize: 25,
        position: "absolute",
        bottom: 5,
        left: 15,
        fontWeight: 'bold'
    },
    tip: {
        width: "50%",
        textAlign: "center",
        color: "#929292",
        fontSize: 15,
        marginTop: 10
    },
    searchPlaceholder: {
        color: "#929292",
        marginLeft: 10,
        fontSize: 16
    }
});

export default HomeScreen;