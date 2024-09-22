import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router'
import { createUser } from "../../lib/appwrite"
import CustomSwitch from '../../components/CustomSwitch'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      console.log(form.email);
      
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (

    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6 ">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain'/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e)=> {setForm({...form, username:e})}}
            otherStyles="mt-7"
            placeholder="Useername"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e)=> {setForm({...form, email:e})}}
            otherStyles="mt-7"
            placeholder="Email"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e)=> {console.log(form);
             setForm({...form, password:e})}}
            placeholder="Password"
            otherStyles="mt-7"
          />
          <CustomSwitch />
          <CustomButton 
            title={"Sign Up"}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lgh text-gray-100 font-pregular">
              Have an account already?{" "}
              <Link href={"/sign-in"} className='text-lg font-psemibold text-secondary '>Sign In</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp