import { Post } from 'interface';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { Box } from '@mui/material';

type Props = {
  post: Post;
};

export const PostBody = ({ post }: Props) => {
  return (
    <>
      {post.retweetData ? (
        <>
          {post.text && <PostContent text={post.text} />}

          <Box mt={1} p={1} sx={{ border: '1px solid #2a3236' }}>
            <Box
              sx={{
                '.avatar': { height: 30, width: 30 },
                '.name': {
                  fontWeight: 500,
                },
                '.createdAt': {
                  display: 'none',
                },
              }}
            >
              <PostHeader post={post} />
            </Box>

            <PostContent text={post.retweetData.text} imageUrl={post.retweetData.image?.url} />
          </Box>
        </>
      ) : (
        <PostContent text={post.text} imageUrl={post.image?.url} />
      )}
    </>
  );
};
