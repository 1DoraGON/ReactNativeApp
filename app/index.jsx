import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { Link, Redirect, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext()
  if(!isLoading && isLoggedIn) return <Redirect href={"/home"}/>
  return (


    <SafeAreaView className="bg-primary h-full">

      <ScrollView contentContainerStyle={{ height: "100%"}} >
        <View className="w-full justify-start items-center min-h-[85vh] px-4">
          <Image 
            className="w-[130px] h-[84px]"
            source={images.logo}
            resizeMode='contain'
            />
          <Image 
            className="maw-w-[380px] w-full h-[300px]"
            source={images.cards}
            resizeMode='contain'
            />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200 ">Aora</Text></Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode='contain'
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where creativity meets innovation: embrak on a journey of limitless exploration with Aora
            </Text>
            <CustomButton 
              title="Continue with Email"
              handlePress = {() => router.push("sign-in")}
              containerStyles={"w-full mt-7"}
              textStyles=""
              isLoading={false}
            />
            <Link className='text-white' href="/home">GO home</Link>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />

    </SafeAreaView>

  );
}



