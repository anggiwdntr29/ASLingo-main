import {AlertDialog, Divider, Pressable, Stack, Text} from 'native-base';
import React from 'react';

const ExitAlertDialog = ({showAlertExit, cancelRef, setShowAlertExit}) => (
  <AlertDialog
    isOpen={showAlertExit}
    leastDestructiveRef={cancelRef}
    onClose={() => setShowAlertExit(false)}>
    <AlertDialog.Content>
      <Stack>
        <Text py={2} px={4} fontSize="lg" fontWeight={700}>
          Peringatan
        </Text>
        <Divider />
        <Stack py={2} px={4} space={2}>
          <Text>
            Quiz sedang berlangsung. silakan lanjutkan dengan menjawab
            pertanyaannya.
          </Text>
          <Pressable
            px={4}
            py={2}
            backgroundColor="Primary"
            justifyContent="center"
            borderRadius="lg"
            alignSelf="flex-end"
            onPress={() => setShowAlertExit(false)}>
            <Text
              fontWeight={600}
              fontSize="sm"
              textAlign="center"
              color="Text">
              Ok
            </Text>
          </Pressable>
        </Stack>
      </Stack>
    </AlertDialog.Content>
  </AlertDialog>
);

export default ExitAlertDialog;
