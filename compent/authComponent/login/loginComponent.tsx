import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Context} from "../../App";
import {observer} from "mobx-react-lite";
import {ErrorMessage, Field, Formik} from "formik"

const LoginForm: FC = () => {
  let {store} = useContext(Context)

  return (
    <View style={styles.constainer}>
      <Text style={styles.title}>{store.isAuth ? `Autorize${store.user}` : "Login"}</Text>
      <Formik initialValues={{username: '', password: ''}}
              validate={(values: any) => {
                const errors: any = {};
                if (!values.username) {
                  errors.username = 'Required';
                } else if (
                  !/^[^._ ](?:[\w-]|\.[\w-])+[^._ ]$/i.test(values.username)
                ) {
                  errors.username = 'Invalid username';
                }

                if (!values.password) {
                  errors.password = 'Required';
                }

                if (values.password.length < 8) {
                  errors.password = 'password less then 8 symbol';
                }

                return errors;
              }}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  let jsonAuth: string = JSON.stringify(values, null, 2)
                  alert(jsonAuth);
                  store.login(values.username, values.password);
                  setSubmitting(false);
                }, 400);
              }}>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <Text>{errors.username && touched.username && errors.username}</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Text>{errors.password && touched.password && errors.password}</Text>
            <Pressable style={styles.btn} disabled={isSubmitting} onPress={() => handleSubmit}>
              <Text style={styles.btnText}>{'SUBMIT'}</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    width: '70%',
  }
  ,
  title: {
    fontSize: 50,
    color: '#4169e1',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderImage: 'initial',
  }
  ,
  btn: {
    marginTop: 15,
    backgroundColor: '#4169e1',
    padding: 5,
    height: 40,
    color: '#fff',
    border: 'none',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  }
});


export default observer(LoginForm);
