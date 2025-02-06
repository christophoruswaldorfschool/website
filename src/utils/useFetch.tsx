import Papa from 'papaparse';

type CallBack = (data:any) => void;

const useFetch = () => {

    const fetchCsvData = async (filePath: string, callback: CallBack) => {
        const response = await fetch(filePath);
        const reader = response.body!.getReader();
        const result = await reader.read();
        const decoder = new TestDecoder('utf-8');
        const csvString = decoder.decode(result.value!);
        const {data} = Papa.parse(csvString,{
            header: true,
            dynamicTyping: true
        })
        callback(data)
    }

    return {fetchCsvData}




}

export default useFetch;