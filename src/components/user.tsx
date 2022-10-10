import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
    ActionIcon,
} from '@mantine/core';
import { IconLock } from '@tabler/icons';
import React from 'react';
import { useNavigate } from 'react-router';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

export default function User({ image, name, email, ...others }: UserButtonProps) {
    const { classes } = useStyles();
    const navigate = useNavigate()

    return (
        <UnstyledButton className={classes.user} {...others}>
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>
                <ActionIcon onClick={()=> navigate("/signin")}>
                    <IconLock size={25} stroke={1.5} />
                </ActionIcon>
            </Group>
        </UnstyledButton>
    );
}