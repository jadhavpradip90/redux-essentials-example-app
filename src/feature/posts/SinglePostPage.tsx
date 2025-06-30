import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from "@/app/hooks";
import { selectPostById } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from '@/components/TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectCurrentUsername } from '../auth/authSlice';

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector(state => selectPostById(state, postId || ""));
  const currentUsername = useAppSelector(selectCurrentUsername);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className="post">
        <PostAuthor userId={post.user} />
         <p className="post-content">{post.content}</p>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
        <Link to={`/posts`} className="button back-button">
          Back To Posts
        </Link>
      </article>
    </section>
  )
}