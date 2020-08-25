import axios from 'axios';

interface IResponse {
    status: number;
    data: any;
}

const get = async (city: string): Promise<IResponse> => {
    const res = await axios.get(`https://api.waqi.info/feed/${city}/?token=3b682b3a61ec67de1e46db4d93f9f282d58a2c0a`);
    return { status: res.status, data: res.data }
}

export default get;