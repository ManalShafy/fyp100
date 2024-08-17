import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import FooterMenu from '../components/Menus/FooterMenu';
import { Picker } from '@react-native-picker/picker';
import { CourseContext } from '../context/courseContext';

const AddCourses = () => {
    const [course, setCourse] = useContext(CourseContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('0');

    const courseTypes = ["paid", "unpaid"];

    const handleRegister = async () => {
        // Validate amount for paid courses
        if (type === "paid") {
            if (!amount || parseFloat(amount) <= 0) {
                alert("Amount is required and should be greater than zero for paid courses");
                return;
            }
            if (isNaN(amount)) {
                alert("Amount should be a valid number");
                return;
            }
        }

        try {
            const { data } = await axios.post("/course/add-course", {
                title,
                description,
                duration,
                type,
                amount: type === "paid" ? amount : undefined,
            });
            alert(data && data.message);
            setCourse([...course, data?.course])
            setTitle('');
            setDescription('');
            setDuration('');
            setType('');
            setAmount('');
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    const isFormValid = title && description && duration && type && (type === "unpaid" || (type === "paid" && amount));

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Add a Course</Text>
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Title</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={{ fontWeight: 'bold' }}>Description</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={{ fontWeight: 'bold' }}>Duration</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <Text style={{ fontWeight: 'bold' }}>Type</Text>
                    <Picker
                        selectedValue={type}
                        style={styles.inputBox1}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                    >
                        {courseTypes.map((type) => (
                            <Picker.Item label={type.charAt(0).toUpperCase() + type.slice(1)} value={type} key={type} />
                        ))}
                    </Picker>
                    <Text style={{ fontWeight: 'bold' }}>Amount ($)</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={amount}
                        editable={type.toLowerCase() === "paid"}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                    <View style={{ marginBottom: 20 }}>
                        <TouchableOpacity
                            disabled={!isFormValid}
                            onPress={handleRegister}
                            style={styles.btn}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.container2}>
                <FooterMenu />
            </View>
        </View>
    );
};

export default AddCourses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    container2: {
        flex: 1,
        justifyContent: "flex-end",
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        width: 350,
        paddingLeft: 10,
        color: "gray",
        borderColor: "#800080",
        borderWidth: 2,
    },
    inputBox1: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "#e6e6fa",
        borderRadius: 20,
        marginTop: 10,
        width: 350,
        paddingLeft: 10,
        color: "gray",
        borderColor: "#800080",
        borderWidth: 2,
    },
    btn: {
        backgroundColor: "#800080",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
