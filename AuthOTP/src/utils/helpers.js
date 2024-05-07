export const formatTimestamp =(timestamp)=>{
    const date=new Date(timestamp.toMills());
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
//function to generate a unique key for messages or other items
export const generateKey = ()=>{
    return Math.random().toString(36).substr(2,10);
};
//function to sort messages based on their timestamp
export const sortMessagesByTimestamp=(messages)=>{
    return messages.sort(
        (a,b) => a.timestamp.toMills() - b.timestamp.toMills()
 );
};






























