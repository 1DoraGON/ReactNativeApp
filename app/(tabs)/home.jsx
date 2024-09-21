import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{id:1},{id:1},{id:1},{id:1}]}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=> (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className='Text-pmedium text-sm text-gray-100'>Welcome Back!</Text>
                <Text className='text-2xl font-psemibold text-white'>L'equipe </Text>
              </View>
              <View className="mt-1.5">
                <Image></Image>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home