import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startIcon, endIcon, ...props }, ref) => {
        const StartIcon = startIcon;
        const EndIcon = endIcon;

        return (
            <div className="w-full relative">
                {StartIcon && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <StartIcon size={18} className="text-muted-foreground dark:text-zinc-100 text-zinc-950" />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:text-stone-950 dark:focus-visible:text-stone-50 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity',
                        startIcon ? 'pl-11' : '',
                        endIcon ? 'pr-8' : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <EndIcon className="text-muted-foreground dark:text-zinc-100 text-zinc-950" size={18} />
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
