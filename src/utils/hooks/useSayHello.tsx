import React from "react";

export default function useSayHello(){
    const [hello, setHello] = React.useState('');

    const handleSubmit = () => {
        setHello('Cargando...');
        setTimeout(() => {
            setHello('Hello');
        }, 2000);
    }
    React.useEffect(() => {
        handleSubmit();
    },[])
    return {
        hello
    }
} 