import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

interface PostFeedProps {
    userId?: string;
}

// {postFeed => get userId => usePost(userId) => data => PostItem}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);

    return (
        <>
            {posts.map((post: Record<string, any>,) => (
                <PostItem userId={userId} key={post.id} data={post} />
            ))}
        </>
    );
};

export default PostFeed;