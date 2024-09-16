import { TravelInformationStep, TravelOwnerStep, TravelParticipantsStep } from './StepTravel/Steps';
import { TravelFormProps } from '@/app/page';
import { UseFormReturn } from 'react-hook-form';

type RenderStepContentProps = {
    stepIndex: number;
    form: UseFormReturn<TravelFormProps>;
};

export function RenderStepContent({ stepIndex, form }: RenderStepContentProps) {
    switch (stepIndex) {
        case 0:
            return <TravelInformationStep form={form} />;
        case 1:
            return <TravelParticipantsStep form={form} />;
        case 2:
            return <TravelOwnerStep form={form} />;
    }
}
