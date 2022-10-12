import {
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    ActionIcon,
} from '@mantine/core';
import { IconLock } from '@tabler/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutInvestigator } from '../features/user/userSlice';

interface UserButtonProps extends UnstyledButtonProps {
    name?: string
    email?: string
    token?: string
    phone?: string
    town?: string
}

export default function User({ name, email, token, phone, town }: UserButtonProps) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Group p={15}>
            <Avatar radius="xl" size={"md"}  color={"teal.4"} />

            <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                    {name}
                </Text>

                <Text color="dimmed" size="xs">
                    {email} ({town})
                </Text>
            </div>
            <ActionIcon onClick={() => {
                dispatch(logoutInvestigator(String(token)))
            }
            }>
                <IconLock size={25} stroke={1.5} />
            </ActionIcon>
        </Group>
    );
}