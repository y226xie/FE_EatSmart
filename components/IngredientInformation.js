import styled from 'styled-components/native';
import {Button, View, Text, Image, Modal, StyleSheet, Pressable, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import RNDateFormat from 'react-native-date-format';


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width:300,
      height: 500,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
    //   alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonSubmit: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: 'green',
    },
    buttonCancel: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'red'
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
  });

export function IngredientInformation(props) {
   const [isModalOpen, setIsModalOpen] = React.useState(false);
   const [quantity, onChangeQuantity] = React.useState(props.data.amount);
//    const [bestBefore, onChangeBestBefore] = React.useState(props.data.best_before);
    const [date, setDate] = useState(new Date(props.data.best_before));
    const [open, setOpen] = useState(false);

    const handleCancel = () => {
        setDate(new Date(props.data.best_before))
        onChangeQuantity(props.data.amount)
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        try{
            // props.data.amount = quantity;
            put_body = JSON.stringify({
                "best_before": date,
                "amount": quantity
            })
            const response = fetch('http:localhost:4000/storage/ingredient/'+ props.data._id, {
                method: 'PUT',
                headers: {
                'Content-Type': `application/json`,
                'Accept': `application/json`,
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NTU1NzkyNSwianRpIjoiYjk3NjI0YWUtYjQ3Ni00YjVhLTk2OTUtYTA5ODdiZDQyMmMwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJfaWQiOiI2MWQyZjViODY0MWJmNTk1YzI0MjA5MjkiLCJmaXJzdE5hbWUiOiJGdWhhaSIsImxhc3ROYW1lIjoiR2FvIiwiZW1haWwiOiJmaGFpLmdhb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3QifSwibmJmIjoxNjQ1NTU3OTI1LCJleHAiOjE2NDU2NDQzMjV9.Pl5nUbT4aGKbyqsTkQS8JSgpcKqBKatUVM-ZTEVY7fQ`,
                },
                body: put_body
            });
        } catch (error) {
            console.log(error.message)
        }
        setIsModalOpen(false);
    }

    return (
        <Container>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Ingredient Modification</Text>
                        <Image
                        source={{uri: "https://picsum.photos/700"}}
                            style={{
                            width: 70,
                            height:70
                        }}
                        />
                        <Spacer width="0" height="12"/>
                        <Text> Name:        {props.data.name} </Text>
                        <Text> Category:    {props.data.aisle} </Text>
                        <Row>
                            <Text>Quantity</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeQuantity}
                                value={JSON.stringify(quantity)}
                                placeholder="quantity"
                            />
                            <Text>{props.data.unit}</Text>
                        </Row>
                        <Text>Best Before</Text>
                        <Text>{date.toISOString()}</Text>
                        <Button title="Select Date" onPress={() => setOpen(true)} />
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                    <Pressable
                        style={[styles.buttonSubmit]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.buttonCancel]}
                        onPress={handleCancel}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    </View>
                </View>
            </Modal>

            <Image
            source={{uri: 'https://picsum.photos/700'}}
            style={{

            width: 70,
            height:70
            }}
            />
            <Spacer width="12" height="0"/>
            <Column>
            <Text> Name:        </Text>
            <Text> Category:    </Text>
            <Text> Quantity:    </Text>
            <Text> Best Before: </Text>
            </Column>
            <Spacer width="12" height="0"/>
            <Column>
            <Text> {props.data.name} </Text>
            <Text> {props.data.aisle} </Text>
            <Text> {props.data.amount} {props.data.unit} </Text>
            <Row>
                <Text> {props.data.best_before.slice(0, 11)} </Text>
                <TouchableOpacity onPress={()=>setIsModalOpen(true)}>
                    <View>
                    <Ionicons  name={"pencil"}/>
                    </View>
                </TouchableOpacity>

            </Row>
            
            </Column>
            <Spacer width="10" height="0"/>
        </Container>
    )
}

const Row = styled.View`
    display: flex;
    flex-direction: row;
`


const Column = styled.View`
    display: flex;
    flex-direction: column;
`

const Spacer = styled.View`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`   
const Container = styled(Row)`
    width: 100%;
    border-radius: 10px;
    border: 1px solid grey;
    padding: 10px;
    margin-top: 12px;
    
`