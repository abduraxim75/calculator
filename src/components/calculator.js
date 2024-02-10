import React, { useState, useEffect, useRef } from 'react';
import './calculator.scss';

const Calculator = () => {
    const [result, setResult] = useState("");
    const [operatorUsed, setOperatorUsed] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleKey = (e) => {
        const key = e.key;
        const lastChar = result.slice(-1);

        if (key === 'Enter') {
            e.preventDefault();
            calculateResult();
        } else if ((/\d/).test(key)) {
            setResult(result.concat(key));
            setOperatorUsed(false);
        } else if (key === 'Backspace' || key === 'Delete') {
            backspace();
        } else if (isOperator(key) && !operatorUsed && /\d$/.test(result)) {
            setResult(result.concat(key));
            setOperatorUsed(true);
        }
    };

    const isOperator = (char) => {
        return char === '+' || char === '-' || char === '*' || char === '/';
    };

    const backspace = () => {
        setResult(result.slice(0, -1));
        setOperatorUsed(false);
    };

    const calculateResult = () => {
        try {
            setResult(eval(result).toString());
            setOperatorUsed(false);
        } catch (error) {
            setResult("");
        }
    };

    return (
        <div className='cal-container' onKeyDown={handleKey} tabIndex={-1}>
            <form>
                <input ref={inputRef} type="text" value={result} readOnly />
            </form>
            <div className='keypad'>
                <button id='highlight' onClick={() => setResult('')} className='clear'>Clear</button>
                <button id='highlight' onClick={backspace} className='c'>&larr;</button>
                <button id='highlight' onClick={() => setResult(result.concat('/'))}>&divide;</button>
                <button onClick={() => setResult(result.concat('7'))}>7</button>
                <button onClick={() => setResult(result.concat('8'))}>8</button>
                <button onClick={() => setResult(result.concat('9'))}>9</button>
                <button id='highlight' onClick={() => setResult(result.concat('*'))}>&times;</button>
                <button onClick={() => setResult(result.concat('4'))}>4</button>
                <button onClick={() => setResult(result.concat('5'))}>5</button>
                <button onClick={() => setResult(result.concat('6'))}>6</button>
                <button id='highlight' onClick={() => setResult(result.concat('-'))}>&ndash;</button>
                <button onClick={() => setResult(result.concat('1'))}>1</button>
                <button onClick={() => setResult(result.concat('2'))}>2</button>
                <button onClick={() => setResult(result.concat('3'))}>3</button>
                <button id='highlight' onClick={() => setResult(result.concat('+'))}>+</button>
                <button onClick={() => setResult(result.concat('0'))}>0</button>
                <button onClick={() => setResult(result.concat('.'))}>.</button>
                <button id='highlight' onClick={calculateResult} className='result'>=</button>
            </div>
        </div>
    );
};

export default Calculator;
