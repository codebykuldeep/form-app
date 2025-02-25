export async function getAccountData(token:string):Promise<unknown>{
    const credentials = btoa(`${token}:`); // Encode to Base64

    const response = await fetch("https://api.teller.io/accounts", {
    method: "GET",
    headers: {
        "Authorization": `Basic ${credentials}`, // Basic Auth header
        "Content-Type": "application/json",
    },
    }) 
    const data = await response.json();
    console.log('fetch data',data);
    return data;
}