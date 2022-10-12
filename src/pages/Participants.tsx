import { Button, Group, Stack, Select, Grid, Modal, useMantineTheme, TextInput, NumberInput, SegmentedControl, Overlay, LoadingOverlay, Loader, ActionIcon, Tooltip, Blockquote } from '@mantine/core';
import React, {  useEffect } from 'react';
import _ from "lodash"

import { useState } from 'react';
import StatsSegments from '../components/stats';
import User from '../components/user';
import { IconCheck, IconChevronRight, IconChevronsRight, IconLayoutGridAdd } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { addInvestigated, getListInvestigated, setInvestigated } from '../features/user/userSlice';
import { getNewAudio, sendAudio, setCurrentLangage, setDataAudioSource, setDataAudioTarget } from '../features/audio/audioSlice';

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

export default function Participants() {
  const theme = useMantineTheme();
  const investigator = useSelector((state: RootState) => state.user.investigator)
  const investigated = useSelector((state: RootState) => state.user.investigated)
  const listInvestigated: any[] = useSelector((state: RootState) => state.user.listInvestigated)
  const loading = useSelector((state: RootState) => state.user.loading)

  const currentAudio = useSelector((state: RootState) => state.audio.currentAudio)
  const dataAudioSource = useSelector((state: RootState) => state.audio.dataAudioSource)
  const dataAudioTarget = useSelector((state: RootState) => state.audio.dataAudioTarget)
  const currentLangage = useSelector((state: RootState) => state.audio.currentLangage)


  const [opened, setopen] = useState(false)
  const dispatch = useDispatch()
  const [data, setdata] = useState({
    name: "",
    year: 0,
    genre: "",
    town: ""
  })
  const validData = data.year > 0 && data.town.trim().length > 0 && data.genre.trim().length > 0
  const validAudio = investigated && dataAudioSource && dataAudioTarget && currentAudio

  const sendAudioData = () => {
    if (validAudio) {
      dispatch(sendAudio({ blobSource: dataAudioSource.blob, blobTarget: dataAudioTarget.blob, audioId: String(currentAudio.id_), ref: String(currentAudio.ref), userId: String(investigated) }))
      dispatch(setDataAudioSource(null))
      dispatch(setDataAudioTarget(null))
      dispatch(getNewAudio(investigated))
    }
  }

  useEffect(() => {
    dispatch(getListInvestigated())
  }, [])

  useEffect(() => {
    if (investigated) {
      dispatch(getNewAudio(Number(investigated)))
    }
  }, [investigated])

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
              limit={3}
              data={listInvestigated.map(elt => ({ value: elt.id_, label: `${elt.name} (${elt.year} ans, ${elt.town})`, }))}
              searchable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              onChange={(value) => {
                dispatch(setInvestigated(value))
              }}
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
          {currentAudio && <Blockquote cite={`– ${currentLangage}`}>
            {currentAudio.sourceLang}
          </Blockquote>}

          <SegmentedControl
            color={"teal.5"}
            onChange={(value) => { dispatch(setCurrentLangage(value)) }}
            data={[
              { label: 'Francais', value: 'source' },
              { label: 'Dioula', value: 'target' },
            ]}
          />
        </Stack>
        <Group p={"lg"} grow>
          <Button disabled={!validAudio} size='md' color="teal.5">Envoyer l'audio</Button>
          <Button rightIcon={
            loading ? <Loader size={"sm"} variant="bars" color={"teal.4"} /> : <IconChevronsRight />
          }

            disabled={!investigated} size='md' variant='outline' color="teal.5" onClick={() => { dispatch(getNewAudio(Number(investigated))) }}>Passer</Button>
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
          <TextInput disabled={loading} label="Nom" placeholder="Nom" value={data.name} onChange={(ev) => {
            setdata({ ...data, name: ev.target.value })
          }} />
          <NumberInput disabled={loading} label="Âge" placeholder="Age" required value={data.year} onChange={(value) => {
            setdata({ ...data, year: Number(value) })
          }} />
          <TextInput disabled={loading} label="Ville" placeholder="Ville" value={data.town} onChange={(ev) => {
            setdata({ ...data, town: ev.target.value })
          }} />
          <SegmentedControl
            disabled={loading}
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
        <Button leftIcon={
          loading ?
            <Loader size={"sm"} variant="bars" color={"teal.4"} /> :
            <IconCheck size={20} />
        } disabled={!validData} fullWidth my={"md"} variant={"outline"} size={"md"} color={"teal.5"} onClick={() => {
          dispatch(addInvestigated(data))
        }} >Valider</Button>
      </Modal>
    </>
  );
}