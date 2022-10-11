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
    Stack,
    Loader,
    useMantineTheme,
} from '@mantine/core';

import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../features/store';
import { addInvestigator } from '../features/user/userSlice';

export default function Signup() {

    const loading = useSelector((state: RootState) => state.user.loading)
    const theme = useMantineTheme()
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const [confirmPassword, setconfirmPassword] = useState("")
    const [data, setdata] = useState({
        name: "",
        email: "",
        town: "",
        password: "",
        phone: ""
    })

    const validData = data.email.trim().length > 0 &&
        data.phone.trim().length > 0 &&
        data.town.trim().length > 0 &&
        data.password.trim().length > 0 &&
        data.name.trim().length > 0 &&
        data.password.trim() === confirmPassword.trim()

    return (
        <>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Sign up
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do you have an account already ?{' '}
                    <Anchor color={"teal.4"} size="sm" onClick={() => navigate("/signin")}>
                        Sign in
                    </Anchor>
                </Text>

                <Stack p={10} mt={30} spacing="md">
                    <TextInput value={data.name} onChange={(ev) => {
                        setdata({ ...data, name: ev.target.value })
                    }} size='md' label="Name" placeholder="Please fill your name" />
                    <TextInput type={"email"} value={data.email} onChange={(ev) => {
                        setdata({ ...data, email: ev.target.value })
                    }} size='md' label="Email" placeholder="you@mantine.dev" required />
                    <TextInput value={data.town} onChange={(ev) => {
                        setdata({ ...data, town: ev.target.value })
                    }} size='md' label="City" placeholder="Abidjan" required />
                    <TextInput type={"tel"} value={data.phone} onChange={(ev) => {
                        setdata({ ...data, phone: ev.target.value })
                    }} size='md' label="Phone" placeholder="+225" required />
                    <PasswordInput value={data.password} onChange={(ev) => {
                        setdata({ ...data, password: ev.target.value })
                    }} size='md' label="Password" placeholder="Your password" required />
                    <PasswordInput onChange={(ev) => {
                        setconfirmPassword(ev.target.value)
                    }} size='md' label="Confirm Password" placeholder="Please confirm your password" required />
                    <Button disabled={!validData} color={"teal.4"} size='md' fullWidth onClick={() => {
                        dispacth(addInvestigator(data))
                    }}>
                        Sign up
                    </Button>
                </Stack>
            </Container>
            <LoadingOverlay loader={<Loader color={"teal.4"} size={"lg"} variant="bars" />} visible={loading} overlayOpacity={0.6} overlayColor={theme.colors.gray[1]} overlayBlur={4} />
        </>
    );
}