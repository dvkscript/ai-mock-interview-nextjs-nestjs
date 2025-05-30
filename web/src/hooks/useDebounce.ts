import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay = 300): T => {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce