import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SideMenu = () => {

    return (
        <View style={ styles.container }>
            <View style={ styles.profileInfoContainer }>
                <View style={styles.profileData}>
                    <Text style={ styles.name }>Layr Felipe</Text>
                    <Text style={ styles.email }>layrfpf@gmail.com</Text>
                    <Text style={ styles.action }>Ver mais  {'>'} </Text>
                </View>

                <View style={ styles.profilePic }></View>
            </View>

            <View style={ styles.daysContainer }>
                <Text style={ styles.daysHeader }>DIAS DE FOLIA</Text>

                <View style={ styles.days }>
                    <View style={ styles.day }>
                        <Text style={styles.dayText}>fev 18, sábado</Text>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={16} color="#781055"/></TouchableOpacity>
                    </View>

                    <View style={ styles.day }>
                        <Text style={styles.dayText}>fev 19, domingo</Text>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={16} color="#781055"/></TouchableOpacity>
                    </View>

                    <View style={ styles.day }>
                        <Text style={styles.dayText}>fev 20, segunda-feira</Text>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={16} color="#781055"/></TouchableOpacity>
                    </View>

                    <View style={ styles.day }>
                        <Text style={styles.dayText}>fev 21, terça-feira</Text>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={16} color="#781055"/></TouchableOpacity>
                    </View>

                    <View style={ styles.day }>
                        <Text style={styles.dayText}>fev 22, quarta-feira</Text>
                        <TouchableOpacity style={styles.threeDots}><Entypo name="dots-three-vertical" size={16} color="#781055"/></TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={ styles.menuContainer }>
                <Text style={ styles.menuHeader }>MENU</Text>
                <View style={ styles.menu }></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F1C4E2',
      width: "70%",
      height: "100%",
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 5,
      opacity: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
      alignItems: "flex-start",
      borderWidth: 3,
      borderColor: "#781055"
    },
    profileInfoContainer: {
        width: "100%",
        backgroundColor: "#E8A4D1",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    profileData: {
        alignItems: "flex-start"
    },
    name: {
        fontWeight: "900",
        fontSize: 22,
        color: "#781055"
    },
    email: {
        fontWeight: "400",
        fontSize: 14,
        color: "#781055",
        opacity: .5,
        marginTop: 6
    },
    action: {
        fontWeight: "600",
        fontSize: 16,
        color: "#781055",
        marginTop: 6
    },
    profilePic: {
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "#BB689F",
    },
    daysContainer: {
        width: "100%",
        marginTop: 50,
    },
    daysHeader: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '700',
        color: "#474747"
    },
    days: {
        width: "100%",
    },
    day: {
        width: "100%",
        backgroundColor: "#E8A4D1",
        padding: 12,
        marginBottom: 15,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dayText: {
        fontWeight: "500",
        color: "#781055",
        fontSize: 14
    },
    threeDots: {
        alignItems: "center",
        justifyContent: "center",
    },
    menuContainer: {
        width: "100%",
        marginTop: 50
    },
    menu: {
        width: "100%",
        minHeight: 200,
        backgroundColor: "#E8A4D1",
        borderRadius: 5,
    },
    menuHeader: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '700',
        color: "#474747"
    }
});

export default SideMenu;