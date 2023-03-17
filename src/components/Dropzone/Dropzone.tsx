import { Text, Group, Button, createStyles } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'
import { CldUploadButton } from 'next-cloudinary'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}))

interface IProps {
  setPhotos: (arg: string[]) => void
  photos: string[]
}

export function DropzoneButton({ setPhotos, photos }: IProps) {
  const { classes, theme } = useStyles()

  return (
    <div className={classes.wrapper}>
      <CldUploadButton
        onUpload={(result: any, widget: any) => {
          const newPhotos = [...photos, result?.info?.url]
          setPhotos(newPhotos)
          widget.close()
        }}
        uploadPreset="k265nyqn"
      >
        <Dropzone
          openRef={() => {}}
          onDrop={() => {}}
          className={classes.dropzone}
          radius="md"
          accept={[
            MIME_TYPES.png,
            MIME_TYPES.webp,
            MIME_TYPES.jpeg,
            MIME_TYPES.avif,
          ]}
          maxSize={10 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align="center" weight={700} size="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>
                Image file should be less than 10mb
              </Dropzone.Reject>
              <Dropzone.Idle>Add photos</Dropzone.Idle>
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only
              files that are less than 10mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button className={classes.control} size="md" radius="xl">
          Select Photos
        </Button>
      </CldUploadButton>
    </div>
  )
}
