export interface IMessage {
    id?: number;
    conversation_id: number;
    from_user_id: number;
    message: string;
    is_read: boolean;
    user: {
        id: number;
        firstname: string;
        lastname: string;
        profile_picture_url: string;
    };
    created_at: Date;
}
