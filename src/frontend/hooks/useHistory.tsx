import {useState} from 'react';

export default function useHistory() {
    const [history, setHistory] = useState<string>('');

    function addToHistory(location: string) {
    setHistory(location);
}
    return { history, addToHistory };
}