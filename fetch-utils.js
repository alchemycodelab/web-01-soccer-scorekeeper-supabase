const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createGame(game) {
    const response = await client
        .from('games')
        .insert({
            ...game,
            user_id: client.auth.user().id,
        })
        .single();

    return checkError(response);
}

export async function getGames() {
    const response = await client.from('games').select().match({ user_id: client.auth.user().id });

    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
