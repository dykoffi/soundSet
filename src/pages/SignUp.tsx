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
} from '@mantine/core';

import React, { useState } from "react"
import { useNavigate } from 'react-router';

export default function Signup() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()

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
                    <Anchor size="sm" onClick={() => navigate("/signin")}>
                        Sign in
                    </Anchor>
                </Text>

                <Paper shadow="md" p={30} mt={30} radius="md" withBorder>
                    <LoadingOverlay visible={visible} overlayBlur={2} />
                    <TextInput label="Nom" placeholder="Please fill your name" />
                    <TextInput label="Email" placeholder="you@mantine.dev" required />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                    <PasswordInput label="Confirm Password" placeholder="Please confirm your password" required mt="md" />
                    <Button fullWidth mt="xl" onClick={() => setVisible((v) => !v)}>
                        Sign up
                    </Button>
                </Paper>
            </Container>
        </>
    );
}