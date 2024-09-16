import { useStepper } from '../ui/stepper';
import { TravelFormFields, TravelFormProps } from '@/app/page';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    condition?: boolean;
    form: UseFormReturn<TravelFormProps>;
    fields?: TravelFormFields[];
};

export function StepActions({ condition = false, form, fields }: Props) {
    const { nextStep, prevStep, isLastStep, isOptionalStep, isDisabledStep, activeStep, currentStep } = useStepper();

    const isInitialStep = !(activeStep === 0);

    const nextStepForm = async () => {
        if (currentStep.optional) {
            nextStep();
            return;
        }

        const isValid = await form.trigger(fields);

        if (!isValid) return;

        nextStep();
    };

    return (
        <div className="flex justify-end py-3 px-2 gap-2">
            {isInitialStep && (
                <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
                    Voltar
                </Button>
            )}
            <Button size="sm" onClick={nextStepForm} type="button">
                {isLastStep ? 'Confirmar' : isOptionalStep && condition ? 'Pular' : 'Próximo'}
            </Button>
        </div>
    );
}
