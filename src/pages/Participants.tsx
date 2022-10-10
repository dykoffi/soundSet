import { createStyles, Container, Title, Text, Button, Group, Header, Stack, Avatar, Select, Grid, Modal, useMantineTheme, TextInput, NumberInput, SegmentedControl, Overlay, LoadingOverlay, Loader } from '@mantine/core';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router';
import Illustration from './Illustration';
import DataLogo from "../assets/images/logodata354.png"

import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import StatsSegments from '../components/stats';
import User from '../components/user';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

let user = {
  "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  "name": "Harriette Spoonlicker",
  "email": "hspoonlicker@outlook.com"
}

let stats = {
  "total": "345,765",
  "diff": 18,
  "data": [
    {
      "label": "Homme",
      "count": "204,001",
      "part": 59,
      "color": "#47d6ab"
    },
    {
      "label": "Femme",
      "count": "121,017",
      "part": 41,
      "color": "#03141a"
    }
  ]
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default function Participants() {
  const theme = useMantineTheme();
  const [opened, setopen] = useState(false)

  return (
    <>
      <Stack className='h-screen px-2' justify="flex-start" spacing="xs" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
        <User {...user} />
        <StatsSegments {...stats} />
        <Grid align={'end'}>
          <Grid.Col span={"auto"}>
            <Select
              label="Selectionnez un participant"
              placeholder="Pick one"
              size='md'
              itemComponent={SelectItem}
              data={data}
              searchable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item: any) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Button size='md' onClick={() => setopen(true)}>Ajouter</Button>
          </Grid.Col>
        </Grid>
        <Stack className='flex-1'>

        </Stack>
        <Group p={"lg"} grow>
          <Button size='md'>Envoyer l'audio</Button>
        </Group>
      </Stack>
      <Modal
        centered
        withCloseButton={false}
        title="Ajouter un nouveau participant"
        opened={opened}
        overlayColor={theme.colors.gray[2]}
        onClose={() => setopen(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Stack spacing={"sm"}>
          <TextInput label="Nom" placeholder="Nom" />
          <NumberInput label="Âge" placeholder="Age" required />
          <TextInput label="Ville" placeholder="Ville" />
          <SegmentedControl
            color={"blue"}
            // value={value}
            // onChange={setValue}
            data={[
              { label: 'Homme', value: 'M' },
              { label: 'Femme', value: 'F' },
            ]}
          />
        </Stack>
      </Modal>
      <LoadingOverlay loader={<Loader size={"lg"} variant="bars" />} visible overlayOpacity={0.6} overlayColor={theme.colors.gray[1]} overlayBlur={4} />
    </>
  );
}