import { auth } from '@/auth';
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';

const page = async () => {
  // Only logged in users can create a startup
  const session = await auth();
  if(!session) redirect('/');

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup Idea</h1>
      </section>
      <StartupForm />
    </>
  )
}

export default page