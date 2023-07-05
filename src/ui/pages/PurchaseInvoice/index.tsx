import { PageLayout } from '../../molecules';

interface Props {
  name?: string;
}

const PurchaseInvoice = ({ name }: Props) => {
  return <PageLayout name={name}>altro</PageLayout>;
};

export default PurchaseInvoice;
