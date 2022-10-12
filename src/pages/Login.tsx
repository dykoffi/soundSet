import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    LoadingOverlay,
    Center,
    Stack,
    Loader,
    useMantineTheme,
    Notification,
} from '@mantine/core';
import { IconX } from '@tabler/icons';

import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../features/store';
import { loginInvestigator, setNotif } from '../features/user/userSlice';

export default function Authentication() {

    const dispatch = useDispatch()

    const theme = useMantineTheme()
    const loading = useSelector((state: RootState) => state.user.loading)
    const notif = useSelector((state: RootState) => state.user.notif)
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()
    const [data, setdata] = useState({
        email: "",
        password: ""
    })

    const validData = data.email.trim().length > 0 && data.password.trim().length > 0

    return (
        <>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Sign in
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet ?{' '}
                    <Anchor color={"teal.4"} size="sm" onClick={() => navigate("/signup")}>
                        Create account
                    </Anchor>
                </Text>

                <Stack p={10} mt={30} spacing="md">
                    <TextInput size='md' label="Email" value={data.email} onChange={(ev) => {
                        setdata({ ...data, email: ev.target.value })
                    }} placeholder="you@mantine.dev" required />
                    <PasswordInput value={data.password} onChange={(ev) => {
                        setdata({ ...data, password: ev.target.value })
                    }} size='md' label="Password" placeholder="Your password" required />
                    <Button disabled={!validData} color={"teal.4"} fullWidth mt="xl" size='md' onClick={() => {
                        dispatch(loginInvestigator(data))
                    }}>
                        Sign in
                    </Button>
                    {
                        notif &&
                        <Notification color="red" onClose={() => { dispatch(setNotif(false)) }}>
                            Identifiants incorrects, veuillez réessayer
                        </Notification>
                    }
                </Stack>
            </Container>
            <LoadingOverlay loader={<Loader color={"teal.4"} size={"lg"} variant="bars" />} visible={loading} overlayOpacity={0.6} overlayColor={theme.colors.gray[1]} overlayBlur={4} />
        </>
    );
}