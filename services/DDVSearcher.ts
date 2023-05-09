import axios from "axios";



export const getCustomers = async (CustomerName: string) => {
    const response = await axios.get(`https://ddv.inetis.com/iskalnik.aspx?isci=${CustomerName}`);
    return response.data;
}
