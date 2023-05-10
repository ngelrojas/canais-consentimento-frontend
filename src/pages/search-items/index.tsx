import {useState} from 'react';
import DateSPicker from "../../components/datePicker";

export default function SearchItems(){
    const [dateInit, setDateInit] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const handleDateInit = (date_ini: any) => {
        // console.log('HERE IN SEARCH ITEMS - DATE INIT: ', date_ini)
        setDateInit(date_ini);
    }
    
    const handleDateEnd = (date_end: any) => {
        // console.log('HERE IN SEARCH ITEMS - DATE END: ', date_end)
        setDateEnd(date_end);
    }

    return(
        <div>
            <h1>page search item</h1>
            <h2>date init: {dateInit}</h2>
            <h2>date end: {dateEnd}</h2>
            <DateSPicker 
                handleDateInit={handleDateInit}
                handleDateEnd={handleDateEnd}
            />
        </div>
    );
}