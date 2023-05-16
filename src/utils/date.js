export const getDate = (solidityTimestamp) => {
    let str = "";
    if(solidityTimestamp){
        const date = new Date(solidityTimestamp * 1000);
        str = date.toLocaleString("en-US");        
    }
    return str;
 }

