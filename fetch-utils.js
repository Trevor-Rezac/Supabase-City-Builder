const SUPABASE_URL = 'https://vngxqymjjqxmmmbjmden.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNTIyOSwiZXhwIjoxOTU2OTExMjI5fQ.ib6FFtWtVa-GUtSfeEQ14bhX_bPF4FIyUdgmuBE0QPw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function updateSkyline(newSkyline) {
    const user = await getUser();

    const response = await client
        .from('city')
        .update({ skyline: newSkyline })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);

}

export async function updateWaterfront(newWaterfront) {
    const user = await getUser();

    const response = await client
        .from('city')
        .update({ waterfront: newWaterfront })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);

}

export async function updateCastle(newCastle) {
    const user = await getUser();

    const response = await client
        .from('city')
        .update({ castle: newCastle })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);

}

export async function updateCityName(newName) {
    const user = await getUser();
    
    const response = await client
        .from('city')
        .update({ name: newName })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);

}

export async function createDefaultCity() {
    const response = await client
        .from('city')
        .insert([{
            name: 'Portland',
            skyline: `${getRandomNumber()}`,
            waterfront: `${getRandomNumber()}`,
            castle: `${getRandomNumber()}`,
            slogans: [],
        }])
        //this .single was necessary to return an object from the city array
        .single();
    
    return checkError(response);
}

export async function getCity() {

    const response = await client
        .from('city')
        .select()
        .single();

    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 3 + 1);
}