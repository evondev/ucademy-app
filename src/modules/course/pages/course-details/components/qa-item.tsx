import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui';
import { CourseQAData } from '@/shared/types';

export interface QaItemProps {
  item: CourseQAData;
}

function QaItem({ item }: QaItemProps) {
  return (
    <Accordion
      collapsible
      type="single"
    >
      <AccordionItem value={item.question}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default QaItem;
