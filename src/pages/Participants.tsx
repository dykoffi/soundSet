import { createStyles, Container, Title, Text, Button, Group, Header, Stack, Avatar, Select, Grid, Modal, useMantineTheme, TextInput, NumberInput, SegmentedControl, Overlay, LoadingOverlay, Loader, ActionIcon, Tooltip, Blockquote } from '@mantine/core';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router';
import Illustration from './Illustration';
import DataLogo from "../assets/images/logodata354.png"

import { useState } from 'react';
import StatsSegments from '../components/stats';
import User from '../components/user';
import { IconLayoutGridAdd } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { addInvestigated } from '../features/user/userSlice';




const parts = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Edy koffi',
    value: 'Bender Bending Rodríguez',
    description: '15 ans - Abidjan (16 audios)',
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
        <Avatar color={"teal.4"} size={"md"} />

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
  const investigator = useSelector((state: RootState) => state.user.investigator)

  const [opened, setopen] = useState(false)
  const dispatch = useDispatch()
  const [data, setdata] = useState({
    name: "",
    year: 0,
    genre: "",
    town: ""
  })
  const validData = data.year > 0 && data.town.trim().length > 0 && data.genre.trim().length > 0



  return (
    <>
      <Stack className='h-screen px-2' justify="flex-start" spacing="xs" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
        <User {...investigator} />
        <StatsSegments {...stats} />
        <Grid gutter={"xs"} align={'center'}>
          <Grid.Col span={"auto"}>
            <Select
              placeholder="Selectionnez un participant"
              size='md'
              color={"teal.5"}
              itemComponent={SelectItem}
              data={parts}
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
            <Tooltip label="Ajouter un participant">
              <ActionIcon>
                <IconLayoutGridAdd onClick={() => setopen(true)} />
              </ActionIcon>
            </Tooltip>
          </Grid.Col>
        </Grid>
        <Stack className='flex-1'>
          <Blockquote cite="– Forrest Gump">
            Life is like an npm install – you never know what you are going to get.
          </Blockquote>
          <SegmentedControl
            color={"teal.5"}
            // value={value}
            // onChange={setValue}
            data={[
              { label: 'Francais', value: 'francais' },
              { label: 'Baoulé', value: 'baoule' },
            ]}
          />
        </Stack>
        <Group p={"lg"} grow>
          <Button size='md' color="teal.5">Envoyer l'audio</Button>
          <Button size='md' variant='outline' color="teal.5">Passer</Button>
        </Group>
      </Stack>
      <Modal
        centered
        withCloseButton={false}
        title="Ajouter un nouveau participant"
        opened={opened}
        overlayColor={theme.colors.gray[2]}
        onClose={() => {
          setopen(false)
          setdata({
            name: "",
            year: 0,
            genre: "",
            town: ""
          })
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Stack spacing={"sm"}>
          <TextInput label="Nom" placeholder="Nom" value={data.name} onChange={(ev) => {
            setdata({ ...data, name: ev.target.value })
          }} />
          <NumberInput label="Âge" placeholder="Age" required value={data.year} onChange={(value) => {
            setdata({ ...data, year: Number(value) })
          }} />
          <TextInput label="Ville" placeholder="Ville" value={data.town} onChange={(ev) => {
            setdata({ ...data, town: ev.target.value })
          }} />
          <SegmentedControl
            color={"teal.5"}
            value={data.genre}
            onChange={(value) => {
              setdata({ ...data, genre: value })
            }}
            data={[
              { label: 'Homme', value: 'M' },
              { label: 'Femme', value: 'F' },
            ]}
          />
        </Stack>
        <Group></Group>
        <Button disabled={!validData} fullWidth my={"md"} variant={"outline"} size={"md"} color={"teal.5"} onClick={() => {
          dispatch(addInvestigated(data))
        }} >Valider</Button>
      </Modal>
    </>
  );
}