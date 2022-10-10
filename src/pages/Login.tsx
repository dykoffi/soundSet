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

            <Paper shadow="md" p={30} mt={30} radius="md" withBorder>
                <LoadingOverlay visible={visible} overlayBlur={2} />
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Button fullWidth mt="xl" onClick={() => navigate("/participants")}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}