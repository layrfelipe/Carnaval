import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
    return (
        <View style={ styles.container }>
            <View style={ styles.map }>
                <TouchableOpacity style={ styles.menuButton }><FontAwesome name="bars" size={30} color="#781055"/></TouchableOpacity>
                <TouchableOpacity style={ styles.gpsButton }><MaterialIcons name="gps-fixed" size={18} color="#781055"/></TouchableOpacity>
            </View>

            <View style={ styles.main }>
                <View style={ styles.overDivider }>
                    <View style={ styles.searchRow }>
                        <View style={ styles.searchBox }>

                        </View>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={24} color="#781055"/></TouchableOpacity>
                    </View>

                    <View style={ styles.textRow }>
                        <Text style={ styles.date }>fev 18, sábado</Text>
                    </View>
                </View>

                <View style={ styles.divider } />

                <View style={ styles.underDivider }>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#EDEDED',
      width: width,
      height: height,
      marginTop: Constants.statusBarHeight
    },
    map: {
        backgroundColor: "#EDEDED",
        width: width,
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
        width: width,
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
    }
});

export default HomeScreen;