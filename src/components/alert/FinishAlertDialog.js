import {AlertDialog, Button, Center, Heading, HStack} from 'native-base';
import React from 'react';

const FinishAlertDialog = ({
  showAlertFinish,
  cancelRef,
  handleFinish,
  setShowAlertFinish,
}) => (
  <AlertDialog px={10} leastDestructiveRef={cancelRef} isOpen={showAlertFinish}>
    <Center w="100%" shadow={1} backgroundColor="Secondary" rounded="xl" p={6}>
      <Heading fontSize="md" fontWeight={500} color="TextBlack" pb={4}>
        Apakah anda ingin mengirim jawaban?
      </Heading>
      <HStack w="full" justifyContent="space-between">
        <Button
          w="49%"
          variant="outline"
          borderColor="Primary"
          onPress={() => setShowAlertFinish(false)}>
          Batal
        </Button>
        <Button w="49%" backgroundColor="Primary" onPress={handleFinish}>
          Kirim
        </Button>
      </HStack>
    </Center>
  </AlertDialog>
);

export default FinishAlertDialog;
