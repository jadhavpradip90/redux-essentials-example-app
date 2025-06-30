import { AddPostForm } from "./AddPostForm"
import { PostsList } from "./PostsList"

export const PostsMainPage = () => {
    return (
    <div>
        <AddPostForm />
        <PostsList />
    </div>
    );
}