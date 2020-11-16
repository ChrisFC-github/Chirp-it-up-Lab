import { Query } from '../routes/index';

const all = async () => Query('SELECT * FROM chirpsdata');
const oneChirp = async (id: number) => Query('SELECT * FROM chirpsdata WHERE id = ?', [id]);

export default {
    all,
    oneChirp
}