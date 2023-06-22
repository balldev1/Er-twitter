import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import UserHero from '@/components/users/UserHero'


// {Home post comment}
export default function Home() {
  return (
    <>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
