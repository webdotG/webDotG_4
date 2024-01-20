export type typeUser = {
  id?: string | number,
  email?: string,
  name?: string,
  confirmed?: boolean,
  token?: string,
  password?: string,
  confirmPassword?: string
}

export interface typeUserData {
  user: typeUser & { token: string } | null,
  id?: string | undefined,
  email?: string | undefined,
  name?: string | undefined
  isAdmin?: boolean | undefined
}


export interface PostData {
  id?: number,
  title?: string,
  text?: string,
  tags?: string,
  user_id?: string,
  created_at?: string,
  updated_at?: string,
  user_name?: string,
  user_email?: string,
}

export interface PostsState {
  items: PostData[],
  status: string,
}

export interface TagsState {
  items: []
  status: string,
}

export interface typeDeletePostData {
    created_at: string
    id: number
    tags: string
    text: string
    title: string
    updated_at: string
    user_email: string
    user_id: string
    user_name: string
}

export interface RootState {
  posts: PostsState,
  tags: TagsState,
  deletePostMessage: string ,
  deletePostData: typeDeletePostData | null
}

export interface typeFetchAuthFulfilledAction {
  type: string,
  payload: typeUser,
  meta: {
    arg: { email: string, password: string },
    requestId: string,
    requestStatus: 'fulfilled',
  };
}
