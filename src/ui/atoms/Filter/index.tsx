import { theme } from 'ui/themes';
import { ButtonForm, Icons } from '..';
import { Flex } from '@chakra-ui/react';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';

interface Props {
  show: boolean;
  showFilters: boolean;
  isFilterUsed: boolean;
  children: React.ReactNode;
  handleFilters: () => void;
  emptyFilter: () => void;
  search: () => void;
}

const Filter = ({
  show,
  showFilters,
  isFilterUsed,
  children,
  handleFilters,
  emptyFilter,
  search,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Flex direction='column' display={show ? 'none' : 'block'}>
      <ButtonForm
        marginTop='4rem'
        marginBottom='1rem'
        width='fit-content'
        onClick={handleFilters}
        backgroundColor={isFilterUsed ? '#514689b3' : darkModePalette.pink100}
        _hover={{ bg: darkModePalette.pink70 }}
        fontSize={theme.fontSizes.xxs}
      >
        {t('filtri.filtri')}
      </ButtonForm>
      {showFilters ? (
        <Flex
          zIndex={100}
          borderRadius='1rem'
          boxShadow={`1px 1px 4px 4px ${darkModePalette.purpleShadow}`}
          direction='column'
          padding='2rem 1.7rem'
          position='absolute'
          backgroundColor='white'
          width='21.25rem'
          height='74%'
          top='25%'
          right='2%'
        >
          <Flex
            justifyContent='space-between'
            border='solid rgba(123, 97, 255, 0.05)'
            borderWidth='0 0 0.2rem 0'
          >
            <h2 style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.sm }}>
              {t('filtri.filtri')}
            </h2>
            <ButtonForm
              background='transparent'
              padding='0'
              width='fit-content'
              onClick={handleFilters}
              _hover={{ bg: 'transparent' }}
            >
              <Icons name='xCloseIcon' size={1.5} />
            </ButtonForm>
          </Flex>
          {children}
          <Flex justifyContent='space-around'>
            <ButtonForm
              marginTop='4rem'
              marginBottom='1rem'
              display={show ? 'none' : 'block'}
              width='fit-content'
              onClick={emptyFilter}
              backgroundColor={darkModePalette.purple30}
              _hover={{ bg: darkModePalette.pink70 }}
              fontSize={theme.fontSizes.xxs}
            >
              {t('filtri.svuota-filtri')}
            </ButtonForm>
            <ButtonForm
              marginTop='4rem'
              marginBottom='1rem'
              display={show ? 'none' : 'block'}
              width='fit-content'
              onClick={search}
              backgroundColor={darkModePalette.pink100}
              _hover={{ bg: darkModePalette.pink70 }}
              fontSize={theme.fontSizes.xxs}
            >
              {t('filtri.conferma')}
            </ButtonForm>
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default Filter;
