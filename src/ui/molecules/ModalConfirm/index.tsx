import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { ButtonForm, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  objectName?: string;
  handleClose: () => void;
  handleDelete: () => void;
}

const ModalConfirm = ({ open, objectName, handleClose, handleDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay bgColor={'rgba(3, 30, 66, 0.5)'} />
      <ModalContent top='25%'>
        <ModalBody padding='3.5rem 0'>
          <Flex flexDirection='column'>
            <p
              style={{
                textAlign: 'center',
                fontSize: theme.fontSizes.xxs,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              {t('modal-confirm.messaggio')}
              <span style={{ color: darkModePalette.pink100 }}> {objectName}</span>
              <span>?</span>
            </p>
            <Flex width='100%' justifyContent='right' placeContent='center'>
              <Flex paddingTop='3rem'>
                <Stack spacing={3} direction='row'>
                  <ButtonForm
                    backgroundColor={darkModePalette.purple40}
                    color={darkModePalette.purple}
                    leftIcon={<CloseIcon />}
                    width='fit-content'
                    onClick={handleClose}
                    _hover={{ bg: darkModePalette.violet10 }}
                    fontSize={theme.fontSizes.xxs}
                  >
                    Annulla
                  </ButtonForm>
                  <ButtonForm
                    leftIcon={<CheckIcon />}
                    width='fit-content'
                    onClick={handleDelete}
                    backgroundColor={darkModePalette.pink100}
                    _hover={{ bg: darkModePalette.pink70 }}
                    fontSize={theme.fontSizes.xxs}
                  >
                    Conferma
                  </ButtonForm>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
