export interface Userlogin
{
    stsTokenManager:
    {
        accessToken: string,
        refreshToken: string
    },            // DA RIVEDERE !!!!!!!!!!!!!!!!
}

export interface initialStateLogin
{
    data: [] | null | Userlogin;
    loading: boolean;
    error: null | string;
}