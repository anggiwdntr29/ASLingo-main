import {AlertDialog, Divider, Pressable, Stack, Text} from 'native-base';
import React from 'react';

const ErrorAlertDialog = ({showAlertError, cancelRef, setShowAlertError}) => (
  <AlertDialog
    isOpen={showAlertError}
    leastDestructiveRef={cancelRef}
    onClose={() => setShowAlertError(false)}>
    <AlertDialog.Content>
      <Stack>
        <Text py={2} px={4} fontSize="lg" fontWeight={700}>
          Peringatan
        </Text>
        <Divider />
        <Stack py={2} px={4} space={2}>
          <Text>Masih ada jawaban yang kosong</Text>
          <Pressable
            px={4}
            py={2}
            backgroundColor="Primary"
            justifyContent="center"
            borderRadius="lg"
            alignSelf="flex-end"
            onPress={() => setShowAlertError(false)}>
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

export default ErrorAlertDialog;
