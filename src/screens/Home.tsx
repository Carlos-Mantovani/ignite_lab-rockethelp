import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import Filter from '../components/Filter';
import Button from '../components/Button';
import { Order, OrderProps } from '../components/Order'

const Home = () => {
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '212354365',
            when: '21/02/2038 às 14:55',
            status: 'open'
        },
        {
            id: '143',
            patrimony: '756567',
            when: '30/06/2038 às 10:09',
            status: 'closed'
        },
        {
            id: '354',
            patrimony: '34654365',
            when: '08/07/2039 às 11:30',
            status: 'closed'
        }
    ]);

    const navigation = useNavigation();

    const { colors } = useTheme();

    const HandleNewOrder = () => {
        navigation.navigate('new');
    }

    const HandleOpenDetails = (orderId: string) => {
        navigation.navigate('details', { orderId });
    }

    return (
        <VStack flex={1} pb={6} bg='gray.700'>
            <HStack
                w='full'
                justifyContent='space-between'
                alignItems='center'
                bg='gray.600'
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />

                <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>
                        Solicitações
                    </Heading>
                    <Text color={colors.gray[200]}>
                        {orders.length}
                    </Text>
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        type='open'
                        title='em andamento'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        type='closed'
                        title='finalizados'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>


                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => HandleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                                Você não possui solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />
                <Button title='Nova Solicitação' onPress={HandleNewOrder} />
            </VStack>
        </VStack>
    );
}

export default Home;