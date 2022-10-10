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
} from '@mantine/core';

import React, { useState } from "react"
import { useNavigate } from 'react-router';

export default function Authentication() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Sign in
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet ?{' '}
                <Anchor size="sm" onClick={() => navigate("/signup")}>
                    Create account
                </Anchor>
            </Text>

            <Paper p={10} mt={30}>
                <TextInput size='md' label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput size='md' label="Password" placeholder="Your password" required mt="md" />
                <Button fullWidth mt="xl" size='md' onClick={() => navigate("/participants")}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}