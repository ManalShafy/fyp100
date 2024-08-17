import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, Button } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FooterMenu from '../components/Menus/FooterMenu';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        skills: [],
        professionalBackground: '',
        educationalDetails: '',
        bio: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [tempSkill, setTempSkill] = useState('');

    // Handler to update the state
    const handleChange = (name, value) => {
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    // Example handler for adding new skills
    const addSkill = () => {
        if (!tempSkill.trim()) return; // Avoid adding empty skills
        setProfile(prevState => ({
            ...prevState,
            skills: [...prevState.skills, tempSkill]
        }));
        setTempSkill(''); // Clear input after adding
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
                    }}
                    style={{ height: 200, width: 200, borderRadius: 100 }}
                />
            </View>
            <ScrollView >
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Skills</Text>
                    {profile.skills.map((skill, index) => (
                        <Text key={index} style={styles.text}>{skill}</Text>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                        <FontAwesome5 name="plus" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={setTempSkill}
                                value={tempSkill}
                                placeholder="Enter a new skill"
                                autoFocus={true}
                            />
                            <Button title="Add Skill" onPress={addSkill} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Professional Background</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.professionalBackground}
                        onChangeText={(text) => handleChange('professionalBackground', text)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Educational Details</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.educationalDetails}
                        onChangeText={(text) => handleChange('educationalDetails', text)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.bio}
                        onChangeText={(text) => handleChange('bio', text)}
                        multiline
                    />
                </View>
            </ScrollView>
            <View style={styles.container2}>
                <FooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 10
    },
    container2: {
        flex: 1,
        justifyContent: "flex-end",
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 5,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 200,
        marginBottom: 20,
    }
});

export default UserProfile;
