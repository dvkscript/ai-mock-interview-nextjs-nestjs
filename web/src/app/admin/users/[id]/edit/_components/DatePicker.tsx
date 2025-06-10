"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import React, { useCallback, useEffect, useId, useRef } from "react"
import { vi } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
    placeholder?: string;
    id?: string;
    isDisable?: boolean;
    className?: string;
    value?: DateRange;
    onChange?: (value: DateRange | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    placeholder = "",
    id = "",
    isDisable = false,
    className,
    value,
    onChange
}) => {
    const [open, setOpen] = React.useState(false)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
    const defaultId = useId();
    const popoverWidthRef = useRef(0);
    const minDate = new Date();

    const triggerRef = useCallback((buttonNode: HTMLButtonElement) => {
        if (!buttonNode) return;
        const width = buttonNode.offsetWidth;
        popoverWidthRef.current = width;
    }, []);

    useEffect(() => {
        if (!value) return;
        setDateRange(value)
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id={id || defaultId}
                    className={cn("justify-between font-normal w-full", className)}
                    ref={triggerRef}
                    disabled={isDisable}
                >
                    {!!dateRange?.from && !!dateRange?.to ? `${dateRange?.from?.toLocaleDateString()} -> ${dateRange?.to?.toLocaleDateString()}` : placeholder}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full overflow-hidden p-0"
                align="start"
                style={{
                    width: `${popoverWidthRef.current}px`
                }}
            >
                <Calendar
                    mode="range"
                    selected={dateRange}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        if (onChange) {
                            onChange(date);
                        } else {
                            setDateRange(date);
                        }
                    }}
                    locale={vi}
                    className="w-full"
                    disabled={{ before: minDate }}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;